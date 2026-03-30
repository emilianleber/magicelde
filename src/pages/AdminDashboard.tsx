import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import type { DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  MessageCircle, Calendar, CheckSquare, Users, ArrowRight, LogOut,
  Clock3, Mail, GripVertical, Pencil, X, Plus, Check, TrendingUp, UserPlus,
  Maximize2, Minimize2,
} from "lucide-react";
import type { User as SupaUser } from "@supabase/supabase-js";
import AdminLayout from "@/components/admin/AdminLayout";

type WidgetId = "stats" | "neue_anfragen" | "naechste_events" | "offene_todos" | "letzte_mails" | "neue_kunden" | "conversion" | "kalender";

const WIDGET_DEFS: { id: WidgetId; label: string; description: string; span: "full" | "half" }[] = [
  { id: "stats",           label: "Statistiken",     description: "Zahlen auf einen Blick",      span: "full" },
  { id: "kalender",        label: "Kalender",        description: "Events & Anfragen im Monat",  span: "full" },
  { id: "neue_anfragen",   label: "Neue Anfragen",   description: "Letzte Anfragen",              span: "half" },
  { id: "naechste_events", label: "Nächste Events",  description: "Bevorstehende Events",         span: "half" },
  { id: "offene_todos",    label: "Offene Todos",    description: "Offene Aufgaben",              span: "half" },
  { id: "letzte_mails",    label: "Letzte Mails",    description: "Gesendete Nachrichten",        span: "half" },
  { id: "neue_kunden",     label: "Neue Kunden",     description: "Zuletzt hinzugefügt",          span: "half" },
  { id: "conversion",      label: "Conversion",      description: "Anfragen → Events Rate",       span: "half" },
];

const DEFAULT_LAYOUT: WidgetId[] = ["stats","kalender","neue_anfragen","naechste_events","offene_todos","letzte_mails","neue_kunden","conversion"];
const STORAGE_KEY = "admin_widget_layout_v3";
const SIZES_KEY   = "admin_widget_sizes_v1";
const DEFAULT_SIZES: Record<WidgetId, "full" | "half"> = {
  stats: "full", kalender: "full",
  neue_anfragen: "half", naechste_events: "half",
  offene_todos: "half", letzte_mails: "half",
  neue_kunden: "half", conversion: "half",
};

const SortableWidget = ({ id, editMode, size, onRemove, onToggleSize, children }: {
  id: string; editMode: boolean; size: "full" | "half"; onRemove: () => void; onToggleSize: () => void; children: React.ReactNode;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        breakInside: "avoid",
        marginBottom: "1.5rem",
        columnSpan: size === "full" ? "all" : undefined,
      } as React.CSSProperties}
      className="relative"
    >
      {editMode && (
        <>
          <button onClick={onRemove} className="absolute -top-2 -right-2 z-20 w-6 h-6 rounded-full bg-destructive text-white flex items-center justify-center hover:bg-destructive/80 shadow-md">
            <X className="w-3 h-3" />
          </button>
          <button onClick={onToggleSize} title={size === "full" ? "Kleiner" : "Größer"} className="absolute -top-2 right-6 z-20 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center hover:bg-accent/80 shadow-md">
            {size === "full" ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
          </button>
          <div {...attributes} {...listeners} className="absolute top-3 left-3 z-10 cursor-grab active:cursor-grabbing text-muted-foreground/40 hover:text-muted-foreground">
            <GripVertical className="w-4 h-4" />
          </div>
        </>
      )}
      <div className={editMode ? "ring-2 ring-accent/20 ring-offset-2 ring-offset-background rounded-2xl" : ""}>{children}</div>
    </div>
  );
};

interface Req { id: string; created_at: string; status: string | null; name: string; anlass: string | null; ort: string | null; datum: string | null; }
interface Evt { id: string; title: string; event_date: string | null; location: string | null; status: string | null; }
interface Todo { id: string; title: string; status: string | null; due_date: string | null; }
interface Cust { id: string; name: string | null; email: string | null; created_at: string; }
interface Msg { id: string; subject: string; to_email: string; created_at: string; customer?: { name: string | null } | null; }

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<SupaUser | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const [requests, setRequests] = useState<Req[]>([]);
  const [events, setEvents] = useState<Evt[]>([]);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [customers, setCustomers] = useState<Cust[]>([]);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [customerCount, setCustomerCount] = useState(0);

  const [calMonth, setCalMonth] = useState<Date>(() => { const d = new Date(); d.setDate(1); return d; });

  const [layout, setLayout] = useState<WidgetId[]>(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); return s ? JSON.parse(s) : DEFAULT_LAYOUT; } catch { return DEFAULT_LAYOUT; }
  });
  const [editMode, setEditMode] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [widgetSizes, setWidgetSizes] = useState<Record<WidgetId, "full" | "half">>(() => {
    try { const s = localStorage.getItem(SIZES_KEY); return s ? { ...DEFAULT_SIZES, ...JSON.parse(s) } : DEFAULT_SIZES; } catch { return DEFAULT_SIZES; }
  });
  const saveWidgetSizes = useCallback((sizes: Record<WidgetId, "full" | "half">) => {
    setWidgetSizes(sizes); localStorage.setItem(SIZES_KEY, JSON.stringify(sizes));
  }, []);
  const toggleWidgetSize = useCallback((id: WidgetId) => {
    saveWidgetSizes({ ...widgetSizes, [id]: widgetSizes[id] === "full" ? "half" : "full" });
  }, [widgetSizes, saveWidgetSizes]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) { navigate("/admin/login"); return; }
      setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (!user?.email) return;
    const load = async () => {
      setLoading(true);
      const { data: adm } = await supabase.from("portal_admins").select("id").eq("email", user.email!).maybeSingle();
      if (!adm) { setIsAdmin(false); setLoading(false); return; }
      setIsAdmin(true);
      const [r, e, t, cc, c, m] = await Promise.all([
        supabase.from("portal_requests").select("id,created_at,status,name,anlass,ort,datum").order("created_at", { ascending: false }),
        supabase.from("portal_events").select("id,title,event_date,location,status").order("event_date", { ascending: true }),
        supabase.from("portal_todos").select("id,title,status,due_date").order("due_date", { ascending: true }),
        supabase.from("portal_customers").select("*", { count: "exact", head: true }),
        supabase.from("portal_customers").select("id,name,email,created_at").order("created_at", { ascending: false }).limit(5),
        supabase.from("portal_messages").select("id,subject,to_email,created_at,customer:customer_id(name)").order("created_at", { ascending: false }).limit(5),
      ]);
      if (!r.error) setRequests(r.data || []);
      if (!e.error) setEvents(e.data || []);
      if (!t.error) setTodos(t.data || []);
      if (!cc.error) setCustomerCount(cc.count || 0);
      if (!c.error) setCustomers(c.data || []);
      if (!m.error) setMessages(m.data || []);
      setLoading(false);
    };
    load();
  }, [user]);

  const saveLayout = useCallback((l: WidgetId[]) => { setLayout(l); localStorage.setItem(STORAGE_KEY, JSON.stringify(l)); }, []);
  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (over && active.id !== over.id) saveLayout(arrayMove(layout, layout.indexOf(active.id as WidgetId), layout.indexOf(over.id as WidgetId)));
  };

  const logout = async () => { await supabase.auth.signOut(); navigate("/admin/login"); };

  const openTodos = todos.filter((t) => t.status !== "erledigt");
  const newRequests = requests.filter((r) => r.status === "neu");
  const convRate = requests.length > 0 ? Math.round((events.length / requests.length) * 100) : 0;
  const todoRate = todos.length > 0 ? Math.round(((todos.length - openTodos.length) / todos.length) * 100) : 0;
  const thisMonth = requests.filter((r) => { const d = new Date(r.created_at); const n = new Date(); return d.getMonth() === n.getMonth() && d.getFullYear() === n.getFullYear(); });

  const renderWidget = (id: WidgetId) => {
    switch (id) {
      case "stats": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
          <h2 className="font-display text-base font-bold text-foreground mb-4">Statistiken</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Alle Anfragen",     value: requests.length,  icon: MessageCircle, href: "/admin/requests",   color: "text-blue-500 bg-blue-500/10" },
              { label: "Neue Anfragen",     value: newRequests.length, icon: Clock3,      href: "/admin/requests",   color: "text-accent bg-accent/10" },
              { label: "Events",            value: events.length,    icon: Calendar,      href: "/admin/events",     color: "text-green-500 bg-green-500/10" },
              { label: "Kunden",            value: customerCount,    icon: Users,         href: "/admin/customers",  color: "text-purple-500 bg-purple-500/10" },
              { label: "Diesen Monat",      value: thisMonth.length, icon: TrendingUp,    href: "/admin/requests",   color: "text-orange-500 bg-orange-500/10" },
              { label: "Offene Todos",      value: openTodos.length, icon: CheckSquare,   href: "/admin/todos",      color: "text-yellow-600 bg-yellow-500/10" },
              { label: "Mails gesendet",    value: messages.length,  icon: Mail,          href: "/admin/mails",      color: "text-pink-500 bg-pink-500/10" },
              { label: "Conversion",        value: `${convRate}%`,   icon: TrendingUp,    href: "/admin/events",     color: "text-teal-500 bg-teal-500/10" },
            ].map((c) => (
              <Link key={c.label} to={c.href} className="p-4 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors">
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center mb-2.5 ${c.color}`}><c.icon className="w-3.5 h-3.5" /></div>
                <p className="font-display text-xl font-bold text-foreground">{c.value}</p>
                <p className="font-sans text-[11px] text-muted-foreground mt-0.5">{c.label}</p>
              </Link>
            ))}
          </div>
        </div>
      );
      case "neue_anfragen": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 h-full">
          <div className="flex items-center justify-between mb-4"><h2 className="font-display text-base font-bold text-foreground">Neue Anfragen</h2><Link to="/admin/requests" className="text-xs text-accent hover:text-accent/80 flex items-center gap-1">Alle <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="space-y-2">{requests.slice(0, 5).map((r) => (<Link key={r.id} to={`/admin/requests/${r.id}`} className="block p-3 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors"><div className="flex items-center justify-between gap-2"><div className="min-w-0"><p className="font-sans text-sm font-semibold text-foreground truncate">{r.name}</p><p className="font-sans text-xs text-muted-foreground mt-0.5 truncate">{r.anlass || "Anfrage"} · {new Date(r.created_at).toLocaleDateString("de-DE")}</p></div><span className="font-sans text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">{r.status || "offen"}</span></div></Link>))}{requests.length === 0 && <p className="font-sans text-sm text-muted-foreground">Keine Anfragen.</p>}</div>
        </div>
      );
      case "naechste_events": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 h-full">
          <div className="flex items-center justify-between mb-4"><h2 className="font-display text-base font-bold text-foreground">Nächste Events</h2><Link to="/admin/events" className="text-xs text-accent hover:text-accent/80 flex items-center gap-1">Alle <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="space-y-2">{events.filter((e) => !!e.event_date).slice(0, 5).map((e) => (<Link key={e.id} to={`/admin/events/${e.id}`} className="block p-3 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors"><p className="font-sans text-sm font-semibold text-foreground truncate">{e.title}</p><p className="font-sans text-xs text-muted-foreground mt-0.5">{e.event_date ? new Date(e.event_date).toLocaleDateString("de-DE") : "–"}{e.location ? ` · ${e.location}` : ""}</p></Link>))}{events.length === 0 && <p className="font-sans text-sm text-muted-foreground">Keine Events.</p>}</div>
        </div>
      );
      case "offene_todos": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 h-full">
          <div className="flex items-center justify-between mb-4"><h2 className="font-display text-base font-bold text-foreground">Offene Todos</h2><Link to="/admin/todos" className="text-xs text-accent hover:text-accent/80 flex items-center gap-1">Alle <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="space-y-2">{openTodos.slice(0, 5).map((t) => (<div key={t.id} className="p-3 rounded-xl bg-background/60 border border-border/20"><p className="font-sans text-sm font-semibold text-foreground">{t.title}</p>{t.due_date && <p className="font-sans text-xs text-muted-foreground mt-0.5">Fällig: {new Date(t.due_date).toLocaleDateString("de-DE")}</p>}</div>))}{openTodos.length === 0 && <div className="flex items-center gap-2 text-green-600 p-3"><Check className="w-4 h-4" /><p className="font-sans text-sm">Alles erledigt!</p></div>}</div>
        </div>
      );
      case "letzte_mails": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 h-full">
          <div className="flex items-center justify-between mb-4"><h2 className="font-display text-base font-bold text-foreground">Letzte Mails</h2><Link to="/admin/mails" className="text-xs text-accent hover:text-accent/80 flex items-center gap-1">Alle <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="space-y-2">{messages.slice(0, 5).map((m) => (<div key={m.id} className="p-3 rounded-xl bg-background/60 border border-border/20"><p className="font-sans text-sm font-semibold text-foreground truncate">{m.subject}</p><p className="font-sans text-xs text-muted-foreground mt-0.5">An: {(m.customer as any)?.name || m.to_email} · {new Date(m.created_at).toLocaleDateString("de-DE")}</p></div>))}{messages.length === 0 && <p className="font-sans text-sm text-muted-foreground">Keine Mails.</p>}</div>
        </div>
      );
      case "neue_kunden": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 h-full">
          <div className="flex items-center justify-between mb-4"><h2 className="font-display text-base font-bold text-foreground">Neue Kunden</h2><Link to="/admin/customers" className="text-xs text-accent hover:text-accent/80 flex items-center gap-1">Alle <ArrowRight className="w-3 h-3" /></Link></div>
          <div className="space-y-2">{customers.map((c) => (<Link key={c.id} to={`/admin/customers/${c.id}`} className="flex items-center gap-3 p-3 rounded-xl bg-background/60 border border-border/20 hover:border-accent/20 transition-colors"><div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0"><UserPlus className="w-4 h-4 text-accent" /></div><div className="min-w-0"><p className="font-sans text-sm font-semibold text-foreground truncate">{c.name || "Unbekannt"}</p><p className="font-sans text-xs text-muted-foreground truncate">{c.email}</p></div></Link>))}{customers.length === 0 && <p className="font-sans text-sm text-muted-foreground">Noch keine Kunden.</p>}</div>
        </div>
      );
      case "conversion": return (
        <div className="p-6 rounded-2xl bg-muted/20 border border-border/30 h-full">
          <h2 className="font-display text-base font-bold text-foreground mb-5">Conversion & Insights</h2>
          <div className="space-y-4">
            {[
              { label: "Anfragen → Events", value: convRate, color: "bg-accent" },
              { label: "Todos erledigt", value: todoRate, color: "bg-green-500" },
            ].map((bar) => (
              <div key={bar.label}>
                <div className="flex items-center justify-between mb-1.5"><span className="font-sans text-sm text-muted-foreground">{bar.label}</span><span className="font-sans text-sm font-semibold text-foreground">{bar.value}%</span></div>
                <div className="h-2 bg-border/30 rounded-full overflow-hidden"><div className={`h-full ${bar.color} rounded-full transition-all duration-700`} style={{ width: `${bar.value}%` }} /></div>
              </div>
            ))}
            <div className="grid grid-cols-2 gap-3 pt-2">
              {[
                { label: "Anfragen diesen Monat", value: thisMonth.length },
                { label: "Unbearbeitet",           value: newRequests.length },
              ].map((s) => (
                <div key={s.label} className="p-3 rounded-xl bg-background/60 border border-border/20 text-center">
                  <p className="font-display text-xl font-bold text-foreground">{s.value}</p>
                  <p className="font-sans text-[11px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      case "kalender": {
        const year = calMonth.getFullYear();
        const month = calMonth.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const startPad = (new Date(year, month, 1).getDay() + 6) % 7; // Mon-first
        const todayStr = new Date().toISOString().slice(0, 10);

        const evtDates: Record<string, { id: string; title: string }[]> = {};
        const reqDates: Record<string, { id: string; anlass: string | null }[]> = {};

        events.forEach((e) => {
          if (!e.event_date) return;
          const d = e.event_date.slice(0, 10);
          const [y, m] = d.split("-").map(Number);
          if (y === year && m - 1 === month) {
            if (!evtDates[d]) evtDates[d] = [];
            evtDates[d].push({ id: e.id, title: e.title });
          }
        });

        requests.forEach((r) => {
          if (!r.datum) return;
          const d = r.datum.slice(0, 10);
          const [y, m] = d.split("-").map(Number);
          if (y === year && m - 1 === month) {
            if (!reqDates[d]) reqDates[d] = [];
            reqDates[d].push({ id: r.id, anlass: r.anlass });
          }
        });

        const cells: (number | null)[] = [
          ...Array(startPad).fill(null),
          ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
        ];
        while (cells.length % 7 !== 0) cells.push(null);

        return (
          <div className="p-6 rounded-2xl bg-muted/20 border border-border/30">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-base font-bold text-foreground">Kalender</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { const d = new Date(calMonth); d.setMonth(d.getMonth() - 1); setCalMonth(d); }}
                  className="w-7 h-7 rounded-lg border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors text-sm"
                >‹</button>
                <span className="font-sans text-sm font-medium text-foreground min-w-[140px] text-center">
                  {calMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
                </span>
                <button
                  onClick={() => { const d = new Date(calMonth); d.setMonth(d.getMonth() + 1); setCalMonth(d); }}
                  className="w-7 h-7 rounded-lg border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors text-sm"
                >›</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-1">
              {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
                <div key={d} className="text-center text-[10px] font-semibold text-muted-foreground uppercase py-1">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (!day) return <div key={i} />;
                const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
                const dayEvts = evtDates[dateStr] || [];
                const dayReqs = reqDates[dateStr] || [];
                const isToday = dateStr === todayStr;
                const hasItems = dayEvts.length > 0 || dayReqs.length > 0;
                return (
                  <div
                    key={i}
                    className={`relative flex flex-col items-center justify-start pt-1.5 pb-1 rounded-lg min-h-[42px] text-sm transition-colors ${
                      isToday ? "bg-accent text-accent-foreground font-bold ring-2 ring-accent ring-offset-1 ring-offset-background" : hasItems ? "bg-background/60 border border-border/20 hover:border-accent/30" : "hover:bg-muted/30"
                    }`}
                  >
                    <span className={isToday ? "font-bold" : "text-foreground"}>{day}</span>
                    {hasItems && (
                      <div className="flex gap-0.5 mt-0.5">
                        {dayEvts.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-blue-500" title={`${dayEvts.length} Event(s)`} />}
                        {dayReqs.length > 0 && <span className="w-1.5 h-1.5 rounded-full bg-orange-400" title={`${dayReqs.length} Anfrage(n)`} />}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex items-center gap-5 mt-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" /> Events ({events.filter(e => e.event_date?.startsWith(`${year}-${String(month+1).padStart(2,"0")}`)).length})</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-400 inline-block" /> Anfragen ({requests.filter(r => r.datum?.startsWith(`${year}-${String(month+1).padStart(2,"0")}`)).length})</span>
            </div>
          </div>
        );
      }
      default: return null;
    }
  };

  const hidden = WIDGET_DEFS.filter((w) => !layout.includes(w.id));

  if (loading) return <div className="pt-28 text-center">Wird geladen…</div>;
  if (isAdmin === false) return <div className="pt-28 text-center">Kein Zugriff</div>;

  return (
    <AdminLayout
      title="Dashboard"
      subtitle="Überblick & Insights"
      actions={
        <div className="flex items-center gap-2">
          {editMode && (
            <button onClick={() => setShowPicker(true)} className="inline-flex items-center gap-2 font-sans text-sm border border-border/40 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground transition-colors">
              <Plus className="w-4 h-4" /> Widget
            </button>
          )}
          <button
            onClick={() => { setEditMode(!editMode); setShowPicker(false); }}
            className={`inline-flex items-center gap-2 font-sans text-sm rounded-xl px-3 py-2 transition-colors ${editMode ? "bg-accent text-white" : "border border-border/40 text-muted-foreground hover:text-foreground"}`}
          >
            {editMode ? <><Check className="w-4 h-4" /> Fertig</> : <><Pencil className="w-4 h-4" /> Bearbeiten</>}
          </button>
          <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
            <LogOut className="w-4 h-4" /> Abmelden
          </button>
        </div>
      }
    >
      {/* Widget Picker */}
      {showPicker && (
        <div className="mb-6 p-5 rounded-2xl bg-accent/5 border border-accent/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-base font-bold">Widget hinzufügen</h3>
            <button onClick={() => setShowPicker(false)} className="text-muted-foreground hover:text-foreground"><X className="w-4 h-4" /></button>
          </div>
          {hidden.length === 0 ? <p className="font-sans text-sm text-muted-foreground">Alle Widgets sind bereits aktiv.</p> : (
            <div className="grid sm:grid-cols-3 gap-3">
              {hidden.map((w) => (
                <button key={w.id} onClick={() => { saveLayout([...layout, w.id]); setShowPicker(false); }} className="p-4 rounded-xl bg-background/60 border border-border/20 text-left hover:border-accent/30 transition-colors group">
                  <p className="font-sans text-sm font-semibold text-foreground group-hover:text-accent transition-colors">{w.label}</p>
                  <p className="font-sans text-xs text-muted-foreground mt-0.5">{w.description}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* DnD Masonry Grid */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={layout} strategy={rectSortingStrategy}>
          <div className="xl:columns-2" style={{ columnGap: "1.5rem" }}>
            {layout.map((id) => {
              if (!WIDGET_DEFS.find((w) => w.id === id)) return null;
              const size = widgetSizes[id] ?? "half";
              return (
                <SortableWidget
                  key={id} id={id} editMode={editMode} size={size}
                  onRemove={() => saveLayout(layout.filter((w) => w !== id))}
                  onToggleSize={() => toggleWidgetSize(id)}
                >
                  {renderWidget(id)}
                </SortableWidget>
              );
            })}
          </div>
        </SortableContext>
      </DndContext>
    </AdminLayout>
  );
};

export default AdminDashboard;
