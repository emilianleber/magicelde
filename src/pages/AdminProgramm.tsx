import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Wand2, Package, Video, Sparkles, MapPin, Users2 } from "lucide-react";

const mainSections = [
  {
    label: "Effekte",
    description: "Deine Zaubereffekte & Tricks verwalten. Typ, Dauer, Schwierigkeit und passende Anlässe.",
    href: "/admin/effekte",
    icon: Wand2,
    accent: true,
  },
  {
    label: "Pakete",
    description: "Fertige Show-Pakete mit Effekten, Dauer und Preis. Können direkt bei Buchungen verwendet werden.",
    href: "/admin/pakete",
    icon: Package,
    accent: true,
  },
  {
    label: "Konzepte",
    description: "Individuelle Show-Konzepte für besondere Buchungen. Ablauf, Phasen und Effekte zusammenstellen.",
    href: "/admin/shows",
    icon: Video,
    accent: true,
  },
];

const supportSections = [
  {
    label: "Produktionen",
    description: "Eigene Abendshows, Tourneen und Magic Dinner planen. Termine, Kalkulation und Marketing.",
    href: "/admin/produktionen",
    icon: Sparkles,
  },
  {
    label: "Locations",
    description: "Veranstaltungsorte mit Bühnenmaßen und Technik. Wird bei Events als Referenz verwendet.",
    href: "/admin/locations",
    icon: MapPin,
  },
  {
    label: "Partner",
    description: "Techniker, Fotografen und andere Dienstleister. Können Events zugeordnet werden.",
    href: "/admin/partner",
    icon: Users2,
  },
];

const AdminProgramm = () => (
  <AdminLayout title="Mein Programm" subtitle="Effekte, Pakete & Konzepte">
    {/* Hauptbereiche */}
    <div className="grid sm:grid-cols-3 gap-3 mb-6">
      {mainSections.map((s) => (
        <Link
          key={s.href}
          to={s.href}
          className="p-5 rounded-xl bg-accent/5 border border-accent/20 hover:border-accent/40 hover:bg-accent/10 transition-all group"
        >
          <s.icon className="w-6 h-6 text-accent mb-3" />
          <p className="text-sm font-bold text-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.description}</p>
        </Link>
      ))}
    </div>

    {/* Erweiterte Bereiche */}
    <p className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-3">Erweitert</p>
    <div className="grid sm:grid-cols-3 gap-3">
      {supportSections.map((s) => (
        <Link
          key={s.href}
          to={s.href}
          className="p-5 rounded-xl bg-muted/20 border border-border/30 hover:border-border/60 hover:bg-muted/40 transition-all group"
        >
          <s.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors mb-3" />
          <p className="text-sm font-semibold text-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{s.description}</p>
        </Link>
      ))}
    </div>
  </AdminLayout>
);

export default AdminProgramm;
