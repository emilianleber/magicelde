import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Users, Clock, ArrowRight, X, ExternalLink, CheckSquare, FileText } from "lucide-react";

interface CalEvent {
  id: string;
  title: string;
  event_date: string | null;
  start_time?: string | null;
  location: string | null;
  status: string | null;
  guests?: number | null;
  format?: string | null;
  customer_id?: string | null;
}

interface CalRequest {
  id: string;
  name: string;
  anlass: string | null;
  datum: string | null;
  ort: string | null;
  status: string | null;
  email?: string | null;
  telefon?: string | null;
  gaeste?: number | null;
  nachricht?: string | null;
}

interface OwnEvent {
  id: string;
  summary: string;
  start_date: string;
  start_time: string | null;
  end_date: string | null;
  end_time: string | null;
  all_day: boolean;
  source_id: string | null;
  location: string | null;
  description: string | null;
}

type DrawerEntry =
  | { type: "event"; data: CalEvent }
  | { type: "request"; data: CalRequest }
  | { type: "own"; data: OwnEvent }
  | null;

const STATUS_COLORS: Record<string, string> = {
  in_planung: "bg-blue-100 text-blue-700 border-blue-200",
  vertrag_gesendet: "bg-amber-100 text-amber-700 border-amber-200",
  vertrag_bestaetigt: "bg-emerald-100 text-emerald-700 border-emerald-200",
  rechnung_gesendet: "bg-purple-100 text-purple-700 border-purple-200",
  rechnung_bezahlt: "bg-green-100 text-green-700 border-green-200",
  event_erfolgt: "bg-gray-100 text-gray-700 border-gray-200",
  confirmed: "bg-green-100 text-green-700 border-green-200",
  completed: "bg-gray-100 text-gray-700 border-gray-200",
};

const formatEventStatus = (s?: string | null) => {
  switch (s) {
    case "in_planung": return "In Planung";
    case "vertrag_gesendet": return "Vertrag gesendet";
    case "vertrag_bestaetigt": return "Bestätigt";
    case "rechnung_gesendet": return "Rechnung gesendet";
    case "rechnung_bezahlt": case "confirmed": return "Bezahlt";
    case "event_erfolgt": case "completed": return "Erfolgt";
    case "storniert": case "cancelled": return "Storniert";
    default: return s || "Offen";
  }
};

export default function AdminKalender() {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<CalEvent[]>([]);
  const [requests, setRequests] = useState<CalRequest[]>([]);
  const [ownEvents, setOwnEvents] = useState<OwnEvent[]>([]);
  const [calSources, setCalSources] = useState<Record<string, { name: string; color: string }>>({});
  const [todos, setTodos] = useState<{ id: string; title: string; due_date: string; status: string | null; priority: string | null }[]>([]);
  const [calMonth, setCalMonth] = useState<Date>(() => { const d = new Date(); d.setDate(1); return d; });
  const [drawerEntry, setDrawerEntry] = useState<DrawerEntry>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKey = (ev: KeyboardEvent) => { if (ev.key === "Escape") setDrawerEntry(null); };
    if (drawerEntry) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [drawerEntry]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate("/admin/login");
      else setAuthChecked(true);
    });
  }, [navigate]);

  useEffect(() => {
    if (!authChecked) return;
    const load = async () => {
      setLoading(true);
      const [evtRes, reqRes, ownRes, srcRes, todoRes] = await Promise.all([
        supabase.from("portal_events").select("id,title,event_date,start_time,location,status,guests,format,customer_id").not("status", "in", "(storniert,abgelehnt)").order("event_date", { ascending: true }),
        supabase.from("portal_requests").select("id,name,anlass,datum,ort,status,event_id,email,telefon,gaeste,nachricht").is("event_id", null).not("status", "in", "(storniert,abgelehnt)").order("datum", { ascending: true }),
        supabase.from("calendar_events_cache").select("id,summary,start_date,start_time,end_date,end_time,all_day,source_id,location,description").order("start_date", { ascending: true }),
        supabase.from("calendar_sources").select("id,name,color"),
        supabase.from("portal_todos").select("id,title,due_date,status,priority").not("due_date", "is", null).neq("status", "erledigt").order("due_date"),
      ]);
      if (!evtRes.error) setEvents(evtRes.data || []);
      if (!reqRes.error) setRequests(reqRes.data || []);
      if (!ownRes.error) setOwnEvents(ownRes.data || []);
      if (!todoRes.error) setTodos(todoRes.data || []);
      if (!srcRes.error && srcRes.data) {
        const map: Record<string, { name: string; color: string }> = {};
        for (const s of srcRes.data) map[s.id] = { name: s.name, color: s.color || "#6366f1" };
        setCalSources(map);
      }
      setLoading(false);
    };
    load();
  }, [authChecked]);

  const year = calMonth.getFullYear();
  const month = calMonth.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startPad = (new Date(year, month, 1).getDay() + 6) % 7;
  const todayStr = new Date().toISOString().slice(0, 10);

  const evtByDate: Record<string, CalEvent[]> = {};
  const reqByDate: Record<string, CalRequest[]> = {};
  const ownByDate: Record<string, typeof ownEvents> = {};

  events.forEach((e) => {
    if (!e.event_date) return;
    const d = e.event_date.slice(0, 10);
    if (!evtByDate[d]) evtByDate[d] = [];
    evtByDate[d].push(e);
  });

  requests.forEach((r) => {
    if (!r.datum) return;
    const d = r.datum.slice(0, 10);
    if (!reqByDate[d]) reqByDate[d] = [];
    reqByDate[d].push(r);
  });

  ownEvents.forEach((o) => {
    const d = o.start_date;
    if (!ownByDate[d]) ownByDate[d] = [];
    ownByDate[d].push(o);
  });

  const todoByDate: Record<string, typeof todos> = {};
  todos.forEach((t) => {
    if (!t.due_date) return;
    const d = t.due_date.slice(0, 10);
    if (!todoByDate[d]) todoByDate[d] = [];
    todoByDate[d].push(t);
  });

  const cells: (number | null)[] = [
    ...Array(startPad).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthEvents = events.filter((e) => e.event_date?.startsWith(monthStr));
  const monthRequests = requests.filter((r) => r.datum?.startsWith(monthStr));

  // Upcoming events (next 60 days)
  const now = new Date();
  const in60 = new Date(); in60.setDate(in60.getDate() + 60);
  const upcomingEvents = events
    .filter((e) => e.event_date && new Date(e.event_date) >= now && new Date(e.event_date) <= in60)
    .slice(0, 10);

  const selEvts = selectedDate ? (evtByDate[selectedDate] || []) : [];
  const selReqs = selectedDate ? (reqByDate[selectedDate] || []) : [];

  if (!authChecked) return null;

  return (
    <AdminLayout title="Kalender" subtitle="Events & Anfragen auf einen Blick">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Calendar card */}
        <div className="rounded-2xl border border-border/30 bg-muted/5 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border/20">
            <button
              onClick={() => { const d = new Date(calMonth); d.setMonth(d.getMonth() - 1); setCalMonth(d); setSelectedDate(null); }}
              className="w-9 h-9 rounded-xl border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="text-center">
              <p className="text-lg font-bold text-foreground">
                {calMonth.toLocaleDateString("de-DE", { month: "long", year: "numeric" })}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {monthEvents.length} Event{monthEvents.length !== 1 ? "s" : ""} · {monthRequests.length} Anfrage{monthRequests.length !== 1 ? "n" : ""} · {ownEvents.filter(o => o.start_date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)).length} Termine
              </p>
            </div>
            <button
              onClick={() => { const d = new Date(calMonth); d.setMonth(d.getMonth() + 1); setCalMonth(d); setSelectedDate(null); }}
              className="w-9 h-9 rounded-xl border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-border/20">
            {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((d) => (
              <div key={d} className="py-2 text-center text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Days grid */}
          <div className="grid grid-cols-7">
            {cells.map((day, i) => {
              if (!day) return <div key={i} className="border-b border-r border-border/10 min-h-[80px]" />;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayEvts = evtByDate[dateStr] || [];
              const dayReqs = reqByDate[dateStr] || [];
              const dayOwn = ownByDate[dateStr] || [];
              const dayTodos = todoByDate[dateStr] || [];
              const isToday = dateStr === todayStr;
              const isSelected = selectedDate === dateStr;
              const hasItems = dayEvts.length + dayReqs.length + dayOwn.length + dayTodos.length > 0;
              const isWeekend = (i % 7) >= 5;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={`relative min-h-[80px] sm:min-h-[80px] min-h-[44px] p-1 sm:p-1.5 border-b border-r border-border/10 text-left transition-colors flex flex-col
                    ${isToday ? "bg-foreground/5" : ""}
                    ${isSelected ? "bg-accent/10 ring-2 ring-inset ring-accent/30" : hasItems ? "hover:bg-muted/30" : "hover:bg-muted/20"}
                    ${isWeekend && !isToday ? "bg-muted/5" : ""}
                  `}
                >
                  <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1 ${
                    isToday ? "bg-foreground text-background font-bold" : "text-foreground/70"
                  }`}>
                    {day}
                  </span>
                  <div className="space-y-0.5 w-full">
                    {dayEvts.slice(0, 2).map((e) => (
                      <div key={e.id} className="text-[10px] leading-tight px-1 py-0.5 rounded bg-blue-500/15 text-blue-700 truncate font-medium">
                        {e.title}
                      </div>
                    ))}
                    {dayReqs.slice(0, 1).map((r) => (
                      <div key={r.id} className="text-[10px] leading-tight px-1 py-0.5 rounded bg-orange-400/15 text-orange-700 truncate">
                        {r.anlass || r.name}
                      </div>
                    ))}
                    {dayOwn.slice(0, 2).map((o) => {
                      const srcColor = o.source_id && calSources[o.source_id]?.color || "#6366f1";
                      return (
                        <div key={o.id} className="text-[10px] leading-tight px-1 py-0.5 rounded truncate" style={{ backgroundColor: `${srcColor}20`, color: srcColor }}>
                          {o.summary}
                        </div>
                      );
                    })}
                    {dayTodos.slice(0, 1).map((t) => (
                      <div key={t.id} className="text-[10px] leading-tight px-1 py-0.5 rounded bg-amber-400/15 text-amber-700 truncate">
                        ☐ {t.title}
                      </div>
                    ))}
                    {dayEvts.length + dayReqs.length + dayOwn.length + dayTodos.length > 3 && (
                      <p className="text-[9px] text-muted-foreground px-1">+{dayEvts.length + dayReqs.length + dayOwn.length + dayTodos.length - 3} mehr</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 px-6 py-3 border-t border-border/20 text-xs text-muted-foreground bg-muted/5 flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/40 inline-block" /> Events
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-400/40 inline-block" /> Anfragen
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-amber-400/40 inline-block" /> ToDos
            </span>
            {Object.entries(calSources).map(([id, src]) => (
              <span key={id} className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ backgroundColor: src.color }} /> {src.name}
              </span>
            ))}
          </div>
        </div>

        {/* Selected day detail */}
        {selectedDate && (selEvts.length > 0 || selReqs.length > 0 || (ownByDate[selectedDate] || []).length > 0 || (todoByDate[selectedDate] || []).length > 0) && (
          <div className="rounded-2xl border border-border/30 bg-muted/5 p-5">
            <h3 className="font-semibold text-sm mb-4">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
            </h3>
            <div className="space-y-3">
              {selEvts.map((e) => (
                <button key={e.id} onClick={() => setDrawerEntry({ type: "event", data: e })}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200/60 hover:border-blue-300 transition-colors group text-left">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{e.title}</p>
                    <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-0.5">
                      {e.start_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.start_time}</span>}
                      {e.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>}
                      {e.guests && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{e.guests} Gäste</span>}
                    </div>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[e.status || ""] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                    {formatEventStatus(e.status)}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              {selReqs.map((r) => (
                <button key={r.id} onClick={() => setDrawerEntry({ type: "request", data: r })}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-200/60 hover:border-orange-300 transition-colors group text-left">
                  <div className="w-8 h-8 rounded-lg bg-orange-400/15 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-orange-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{r.anlass || "Anfrage"}</p>
                    <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-0.5">
                      {r.ort && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{r.ort}</span>}
                      <span className="text-muted-foreground/60">{r.name}</span>
                    </div>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-medium">Anfrage</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
              {/* ToDos */}
              {(todoByDate[selectedDate] || []).map((t) => (
                <Link key={t.id} to="/admin/todos"
                  className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-200/60 hover:border-amber-300 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/15 flex items-center justify-center shrink-0">
                    <CheckSquare className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate">{t.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.priority === "hoch" ? "Hoch" : t.priority === "niedrig" ? "Niedrig" : "Mittel"}
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200 font-medium">ToDo</span>
                </Link>
              ))}

              {/* Eigene Termine */}
              {(ownByDate[selectedDate] || []).map((o) => {
                const srcColor = o.source_id && calSources[o.source_id]?.color || "#6366f1";
                const srcName = o.source_id && calSources[o.source_id]?.name || "Kalender";
                return (
                  <button key={o.id} onClick={() => setDrawerEntry({ type: "own", data: o })}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border text-left hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ backgroundColor: `${srcColor}10`, borderColor: `${srcColor}30` }}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${srcColor}20` }}>
                      <Clock className="w-4 h-4" style={{ color: srcColor }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{o.summary}</p>
                      <p className="text-xs text-muted-foreground">{o.start_time ? o.start_time.slice(0, 5) : "Ganztägig"} · {srcName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ---- Detail Drawer (slide-in panel) ---- */}
        {drawerEntry && (
          <div className="fixed inset-0 z-50 flex justify-end" onClick={(ev) => { if (ev.target === ev.currentTarget) setDrawerEntry(null); }}>
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

            {/* Panel */}
            <div
              ref={drawerRef}
              className="relative w-full sm:max-w-md bg-background border-l border-border/40 shadow-2xl animate-in slide-in-from-right duration-200 overflow-y-auto"
            >
              {/* Drawer header */}
              <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/20 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {drawerEntry.type === "event" && (
                    <>
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 flex items-center justify-center">
                        <Calendar className="w-3.5 h-3.5 text-blue-600" />
                      </div>
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider">Event</span>
                    </>
                  )}
                  {drawerEntry.type === "request" && (
                    <>
                      <div className="w-7 h-7 rounded-lg bg-orange-400/15 flex items-center justify-center">
                        <FileText className="w-3.5 h-3.5 text-orange-600" />
                      </div>
                      <span className="text-xs font-semibold text-orange-700 uppercase tracking-wider">Anfrage</span>
                    </>
                  )}
                  {drawerEntry.type === "own" && (() => {
                    const srcColor = drawerEntry.data.source_id && calSources[drawerEntry.data.source_id]?.color || "#6366f1";
                    const srcName = drawerEntry.data.source_id && calSources[drawerEntry.data.source_id]?.name || "Kalender";
                    return (
                      <>
                        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${srcColor}20` }}>
                          <Clock className="w-3.5 h-3.5" style={{ color: srcColor }} />
                        </div>
                        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: srcColor }}>{srcName}</span>
                      </>
                    );
                  })()}
                </div>
                <button
                  onClick={() => setDrawerEntry(null)}
                  className="w-8 h-8 rounded-lg border border-border/30 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer body */}
              <div className="px-6 py-5 space-y-5">
                {/* ---- EVENT detail ---- */}
                {drawerEntry.type === "event" && (() => {
                  const e = drawerEntry.data;
                  return (
                    <>
                      <div>
                        <h2 className="text-lg font-bold text-foreground">{e.title}</h2>
                        <span className={`inline-block mt-2 text-xs px-2.5 py-1 rounded-full border font-medium ${STATUS_COLORS[e.status || ""] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                          {formatEventStatus(e.status)}
                        </span>
                      </div>

                      <div className="space-y-3">
                        {e.event_date && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                {new Date(e.event_date + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                              </p>
                              {e.start_time && <p className="text-xs text-muted-foreground">{e.start_time} Uhr</p>}
                            </div>
                          </div>
                        )}
                        {e.location && (
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{e.location}</p>
                          </div>
                        )}
                        {e.guests && (
                          <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{e.guests} Gäste</p>
                          </div>
                        )}
                        {e.format && (
                          <div className="flex items-start gap-3">
                            <FileText className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{e.format}</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-border/20">
                        <Link
                          to={`/admin/bookings/event/${e.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Details öffnen <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </>
                  );
                })()}

                {/* ---- REQUEST detail ---- */}
                {drawerEntry.type === "request" && (() => {
                  const r = drawerEntry.data;
                  return (
                    <>
                      <div>
                        <h2 className="text-lg font-bold text-foreground">{r.anlass || "Anfrage"}</h2>
                        <span className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 font-medium">
                          Anfrage
                        </span>
                      </div>

                      <div className="space-y-3">
                        {r.name && (
                          <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{r.name}</p>
                              {r.email && <p className="text-xs text-muted-foreground">{r.email}</p>}
                              {r.telefon && <p className="text-xs text-muted-foreground">{r.telefon}</p>}
                            </div>
                          </div>
                        )}
                        {r.datum && (
                          <div className="flex items-start gap-3">
                            <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">
                              {new Date(r.datum + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            </p>
                          </div>
                        )}
                        {r.ort && (
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{r.ort}</p>
                          </div>
                        )}
                        {r.gaeste && (
                          <div className="flex items-start gap-3">
                            <Users className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{r.gaeste} Gäste</p>
                          </div>
                        )}
                        {r.nachricht && (
                          <div className="rounded-xl bg-muted/20 border border-border/20 p-3">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Nachricht</p>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{r.nachricht}</p>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-border/20">
                        <Link
                          to={`/admin/bookings/${r.id}`}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-opacity"
                        >
                          Details öffnen <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </>
                  );
                })()}

                {/* ---- OWN EVENT (calendar_events_cache) detail ---- */}
                {drawerEntry.type === "own" && (() => {
                  const o = drawerEntry.data;
                  const srcColor = o.source_id && calSources[o.source_id]?.color || "#6366f1";
                  const srcName = o.source_id && calSources[o.source_id]?.name || "Kalender";
                  return (
                    <>
                      <div>
                        <h2 className="text-lg font-bold text-foreground">{o.summary}</h2>
                        <span
                          className="inline-block mt-2 text-xs px-2.5 py-1 rounded-full border font-medium"
                          style={{ backgroundColor: `${srcColor}15`, color: srcColor, borderColor: `${srcColor}40` }}
                        >
                          {srcName}
                        </span>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {new Date(o.start_date + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                            </p>
                            {o.all_day ? (
                              <p className="text-xs text-muted-foreground">Ganztägig</p>
                            ) : (
                              <p className="text-xs text-muted-foreground">
                                {o.start_time ? o.start_time.slice(0, 5) : ""}{o.end_time ? ` – ${o.end_time.slice(0, 5)}` : ""} Uhr
                              </p>
                            )}
                            {o.end_date && o.end_date !== o.start_date && (
                              <p className="text-xs text-muted-foreground">
                                bis {new Date(o.end_date + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" })}
                              </p>
                            )}
                          </div>
                        </div>
                        {o.location && (
                          <div className="flex items-start gap-3">
                            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 shrink-0" />
                            <p className="text-sm text-foreground">{o.location}</p>
                          </div>
                        )}
                        {o.description && (
                          <div className="rounded-xl bg-muted/20 border border-border/20 p-3">
                            <p className="text-xs font-semibold text-muted-foreground mb-1">Beschreibung</p>
                            <p className="text-sm text-foreground whitespace-pre-wrap">{o.description}</p>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Upcoming events */}
        <div className="rounded-2xl border border-border/30 bg-muted/5 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Nächste Events (60 Tage)</h3>
            <Link to="/admin/bookings" className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
              Alle Events <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {loading ? (
            <div className="flex justify-center py-8"><div className="animate-spin rounded-full h-6 w-6 border-2 border-foreground border-t-transparent" /></div>
          ) : upcomingEvents.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="w-10 h-10 text-muted-foreground/20 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Keine Events in den nächsten 60 Tagen</p>
            </div>
          ) : (
            <div className="space-y-2">
              {upcomingEvents.map((e) => {
                const evtDate = new Date(e.event_date! + "T12:00:00");
                const daysUntil = Math.round((evtDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <button key={e.id} onClick={() => setDrawerEntry({ type: "event", data: e })}
                    className="w-full flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/20 hover:border-accent/30 hover:bg-muted/20 transition-all group text-left">
                    <div className="shrink-0 w-12 text-center">
                      <p className="text-[10px] font-semibold uppercase text-muted-foreground">
                        {evtDate.toLocaleDateString("de-DE", { month: "short" })}
                      </p>
                      <p className="text-xl font-bold text-foreground leading-tight">{evtDate.getDate()}</p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{e.title}</p>
                      <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-0.5">
                        {e.start_time && <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{e.start_time}</span>}
                        {e.location && <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${STATUS_COLORS[e.status || ""] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
                        {formatEventStatus(e.status)}
                      </span>
                      <p className="text-[10px] text-muted-foreground mt-1">
                        {daysUntil === 0 ? "Heute" : daysUntil === 1 ? "Morgen" : `In ${daysUntil} Tagen`}
                      </p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
