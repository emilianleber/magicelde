import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { Calendar, FileText, MessageCircle, Clock, CheckCircle2, Circle, ArrowRight, Download, LogOut, User, LayoutDashboard, FolderOpen, Phone } from "lucide-react";

interface AuthData {
  kundennummer: string;
  email: string;
  name: string;
}

/* Demo data */
const demoEvents = [
  { id: 1, title: "Firmenweihnachtsfeier", date: "2026-12-18", location: "München, Hotel Bayerischer Hof", status: "confirmed", format: "Close-Up + Bühnenshow", guests: 120 },
  { id: 2, title: "Produktlaunch", date: "2027-02-15", location: "Stuttgart, Porsche Arena", status: "planning", format: "Individuelle Show", guests: 200 },
];

const demoDocuments = [
  { name: "Angebot_Weihnachtsfeier_2026.pdf", date: "2026-10-01", type: "Angebot" },
  { name: "Vertrag_Weihnachtsfeier_2026.pdf", date: "2026-10-15", type: "Vertrag" },
  { name: "Rechnung_2026_001.pdf", date: "2026-11-01", type: "Rechnung" },
];

const timeline = [
  { step: "Anfrage erhalten", done: true, date: "01.10.2026" },
  { step: "Angebot erstellt", done: true, date: "03.10.2026" },
  { step: "Vertrag unterschrieben", done: true, date: "15.10.2026" },
  { step: "Konzept-Abstimmung", done: false, date: "15.11.2026" },
  { step: "Generalprobe / Technik-Check", done: false, date: "17.12.2026" },
  { step: "Event-Tag", done: false, date: "18.12.2026" },
];

const Kundenportal = () => {
  const [auth, setAuth] = useState<AuthData | null>(null);
  const [activeTab, setActiveTab] = useState<"dashboard" | "events" | "documents" | "contact">("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem("kundenportal_auth");
    if (!stored) { navigate("/kundenportal/login"); return; }
    setAuth(JSON.parse(stored));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("kundenportal_auth");
    navigate("/kundenportal/login");
  };

  if (!auth) return null;

  const tabs = [
    { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { id: "events" as const, label: "Events", icon: Calendar },
    { id: "documents" as const, label: "Dokumente", icon: FolderOpen },
    { id: "contact" as const, label: "Kontakt", icon: Phone },
  ];

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <div>
              <p className="font-sans text-xs text-muted-foreground uppercase tracking-widest mb-1">Kundenportal</p>
              <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">Willkommen, {auth.name}</h1>
              <p className="font-sans text-sm text-muted-foreground mt-1">Kundennummer: {auth.kundennummer}</p>
            </div>
            <button onClick={logout} className="flex items-center gap-2 font-sans text-sm text-muted-foreground hover:text-foreground transition-colors">
              <LogOut className="w-4 h-4" /> Abmelden
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-muted/50 rounded-2xl p-1 mb-10 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-background shadow-sm text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { label: "Aktive Events", value: "2", icon: Calendar, color: "text-accent" },
                  { label: "Dokumente", value: "3", icon: FileText, color: "text-accent" },
                  { label: "Nächstes Event", value: "18.12.2026", icon: Clock, color: "text-accent" },
                ].map((stat) => (
                  <div key={stat.label} className="p-6 rounded-2xl bg-muted/30 border border-border/30">
                    <stat.icon className={`w-6 h-6 ${stat.color} mb-3`} />
                    <p className="font-display text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="font-sans text-xs text-muted-foreground mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Timeline */}
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-6">Event-Timeline: Firmenweihnachtsfeier</h2>
                <div className="space-y-4">
                  {timeline.map((t, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="mt-0.5">
                        {t.done ? (
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-sans text-sm font-medium ${t.done ? "text-foreground" : "text-muted-foreground"}`}>{t.step}</p>
                        <p className="font-sans text-xs text-muted-foreground">{t.date}</p>
                      </div>
                      {t.done && <span className="font-sans text-[10px] uppercase tracking-widest text-accent bg-accent/10 px-2 py-1 rounded-full">Erledigt</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Events */}
          {activeTab === "events" && (
            <div className="space-y-4">
              {demoEvents.map((event) => (
                <div key={event.id} className="p-6 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-lg font-bold text-foreground">{event.title}</h3>
                        <span className={`font-sans text-[10px] uppercase tracking-widest px-2 py-1 rounded-full ${
                          event.status === "confirmed" ? "text-accent bg-accent/10" : "text-muted-foreground bg-muted"
                        }`}>
                          {event.status === "confirmed" ? "Bestätigt" : "In Planung"}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-muted-foreground">
                        <span>📅 {new Date(event.date).toLocaleDateString("de-DE")}</span>
                        <span>📍 {event.location}</span>
                        <span>🎭 {event.format}</span>
                        <span>👥 {event.guests} Gäste</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Documents */}
          {activeTab === "documents" && (
            <div className="space-y-3">
              {demoDocuments.map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/30 hover:border-accent/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-accent" />
                    <div>
                      <p className="font-sans text-sm font-medium text-foreground">{doc.name}</p>
                      <p className="font-sans text-xs text-muted-foreground">{doc.type} · {doc.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 font-sans text-xs text-accent hover:text-accent/80 transition-colors">
                    <Download className="w-4 h-4" /> Download
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Contact */}
          {activeTab === "contact" && (
            <div className="max-w-lg">
              <div className="p-8 rounded-3xl bg-muted/20 border border-border/30">
                <h2 className="font-display text-lg font-bold text-foreground mb-4">Ihr Ansprechpartner</h2>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <User className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-sans text-sm font-semibold text-foreground">Emilian Leber</p>
                    <p className="font-sans text-xs text-muted-foreground">Comedy-Zauberer & Showkünstler</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <a href="mailto:info@magicel.de" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                    <MessageCircle className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-foreground">info@magicel.de</span>
                  </a>
                  <a href="tel:+491234567890" className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted/40 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                    <span className="font-sans text-sm text-foreground">+49 123 456 7890</span>
                  </a>
                </div>
                <Link to="/kontakt" className="btn-primary justify-center mt-6 w-full group">
                  Nachricht senden <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageLayout>
  );
};

export default Kundenportal;
