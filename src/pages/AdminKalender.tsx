import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Calendar, ChevronLeft, ChevronRight, MapPin, Users, Clock, ArrowRight } from "lucide-react";

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
}

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
  const [calMonth, setCalMonth] = useState<Date>(() => { const d = new Date(); d.setDate(1); return d; });
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

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
      const [evtRes, reqRes] = await Promise.all([
        supabase.from("portal_events").select("id,title,event_date,start_time,location,status,guests,format,customer_id").order("event_date", { ascending: true }),
        supabase.from("portal_requests").select("id,name,anlass,datum,ort,status,event_id").is("event_id", null).order("datum", { ascending: true }),
      ]);
      if (!evtRes.error) setEvents(evtRes.data || []);
      if (!reqRes.error) setRequests(reqRes.data || []);
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
                {monthEvents.length} Event{monthEvents.length !== 1 ? "s" : ""} · {monthRequests.length} Anfrage{monthRequests.length !== 1 ? "n" : ""}
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
              const isToday = dateStr === todayStr;
              const isSelected = selectedDate === dateStr;
              const hasItems = dayEvts.length + dayReqs.length > 0;
              const isWeekend = (i % 7) >= 5;

              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={`relative min-h-[80px] p-1.5 border-b border-r border-border/10 text-left transition-colors flex flex-col
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
                    {dayEvts.length + dayReqs.length > 3 && (
                      <p className="text-[9px] text-muted-foreground px-1">+{dayEvts.length + dayReqs.length - 3} mehr</p>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-5 px-6 py-3 border-t border-border/20 text-xs text-muted-foreground bg-muted/5">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-blue-500/40 inline-block" /> Events
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-orange-400/40 inline-block" /> Anfragen
            </span>
          </div>
        </div>

        {/* Selected day detail */}
        {selectedDate && (selEvts.length > 0 || selReqs.length > 0) && (
          <div className="rounded-2xl border border-border/30 bg-muted/5 p-5">
            <h3 className="font-semibold text-sm mb-4">
              {new Date(selectedDate + "T12:00:00").toLocaleDateString("de-DE", { weekday: "long", day: "numeric", month: "long" })}
            </h3>
            <div className="space-y-3">
              {selEvts.map((e) => (
                <Link key={e.id} to={`/admin/bookings/event/${e.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 border border-blue-200/60 hover:border-blue-300 transition-colors group">
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
                </Link>
              ))}
              {selReqs.map((r) => (
                <Link key={r.id} to={`/admin/bookings/${r.id}`}
                  className="flex items-center gap-3 p-3 rounded-xl bg-orange-50 border border-orange-200/60 hover:border-orange-300 transition-colors group">
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
                </Link>
              ))}
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
                  <Link key={e.id} to={`/admin/bookings/event/${e.id}`}
                    className="flex items-center gap-4 p-3 rounded-xl bg-background/40 border border-border/20 hover:border-accent/30 hover:bg-muted/20 transition-all group">
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
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
