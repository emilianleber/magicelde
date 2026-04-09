import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Clapperboard, Map, Sparkles, MapPin, Users } from "lucide-react";

interface Stats {
  shows: number;
  touren: number;
  termine: number;
  effekte: number;
  locations: number;
  team: number;
}

const AdminProgrammHub = () => {
  const [stats, setStats] = useState<Stats>({
    shows: 0,
    touren: 0,
    termine: 0,
    effekte: 0,
    locations: 0,
    team: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [showsRes, tourenRes, effekteRes, locationsRes, teamRes] =
        await Promise.all([
          supabase.from("shows_intern").select("*", { count: "exact", head: true }),
          supabase.from("touren").select("*", { count: "exact", head: true }),
          supabase.from("effekte").select("*", { count: "exact", head: true }),
          supabase.from("locations_intern").select("*", { count: "exact", head: true }),
          supabase.from("team_members").select("*", { count: "exact", head: true }),
        ]);

      // Count tour dates separately
      const terminRes = await supabase
        .from("tour_termine")
        .select("*", { count: "exact", head: true });

      setStats({
        shows: showsRes.count ?? 0,
        touren: tourenRes.count ?? 0,
        termine: terminRes.count ?? 0,
        effekte: effekteRes.count ?? 0,
        locations: locationsRes.count ?? 0,
        team: teamRes.count ?? 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    {
      label: "Shows",
      description: "Show-Konzepte, Pakete und Ablaufplanung verwalten.",
      href: "/admin/programm/shows",
      icon: Clapperboard,
      stat: stats.shows,
      statLabel: "Shows",
      accent: true,
    },
    {
      label: "Tour-Planung",
      description: "Eigene Abendshows, Tourneen und Magic Dinner planen.",
      href: "/admin/programm/touren",
      icon: Map,
      stat: stats.touren,
      statLabel: "Touren",
      extra: stats.termine > 0 ? `${stats.termine} Termine geplant` : undefined,
      accent: true,
    },
    {
      label: "Effekte-Bibliothek",
      description: "Zaubereffekte & Tricks mit Typ, Dauer und Schwierigkeit.",
      href: "/admin/programm/effekte",
      icon: Sparkles,
      stat: stats.effekte,
      statLabel: "Effekte",
      accent: false,
    },
    {
      label: "Locations",
      description: "Veranstaltungsorte mit Technik und Buhnenmaßen.",
      href: "/admin/programm/locations",
      icon: MapPin,
      stat: stats.locations,
      statLabel: "Locations",
      accent: false,
    },
    {
      label: "Team",
      description: "Techniker, Fotografen und andere Dienstleister.",
      href: "/admin/programm/team",
      icon: Users,
      stat: stats.team,
      statLabel: "Mitglieder",
      accent: false,
    },
  ];

  return (
    <AdminLayout title="Mein Programm" subtitle="Shows, Touren, Effekte & Team verwalten">
      {/* Quick stats row */}
      <div className="flex flex-wrap gap-3 mb-6">
        {cards.map((c) => (
          <div
            key={c.label}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/30 border border-border/20 text-xs text-muted-foreground"
          >
            <c.icon className="w-3.5 h-3.5" />
            <span className="font-medium text-foreground">
              {loading ? "-" : c.stat}
            </span>
            {c.statLabel}
          </div>
        ))}
      </div>

      {/* Cards grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            to={card.href}
            className={`group relative p-5 rounded-xl border transition-all hover:scale-[1.02] hover:shadow-lg ${
              card.accent
                ? "bg-accent/5 border-accent/20 hover:border-accent/40 hover:bg-accent/10"
                : "bg-muted/20 border-border/30 hover:border-border/60 hover:bg-muted/40"
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <card.icon
                className={`w-6 h-6 ${
                  card.accent
                    ? "text-accent"
                    : "text-muted-foreground group-hover:text-foreground transition-colors"
                }`}
              />
              <span className="text-2xl font-bold text-foreground">
                {loading ? "-" : card.stat}
              </span>
            </div>
            <p className="text-sm font-bold text-foreground mb-1">{card.label}</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {card.description}
            </p>
            {card.extra && (
              <p className="text-[11px] text-accent font-medium mt-2">
                {card.extra}
              </p>
            )}
            <div className="mt-3 text-xs font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity">
              {card.label} verwalten &rarr;
            </div>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminProgrammHub;
