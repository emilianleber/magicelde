import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Wand2, Package, Video, Sparkles, MapPin, Users2 } from "lucide-react";

const sections = [
  { label: "Effekte", description: "Deine Zaubereffekte verwalten", href: "/admin/effekte", icon: Wand2 },
  { label: "Pakete", description: "Fertige Show-Pakete zusammenstellen", href: "/admin/pakete", icon: Package },
  { label: "Shows", description: "Show-Konzepte erstellen", href: "/admin/shows", icon: Video },
  { label: "Produktionen", description: "Eigene Produktionen planen", href: "/admin/produktionen", icon: Sparkles },
  { label: "Locations", description: "Veranstaltungsorte verwalten", href: "/admin/locations", icon: MapPin },
  { label: "Partner", description: "Techniker, Fotografen & Co.", href: "/admin/partner", icon: Users2 },
];

const AdminProgramm = () => (
  <AdminLayout title="Mein Programm" subtitle="Effekte, Pakete & Produktionen">
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {sections.map((s) => (
        <Link
          key={s.href}
          to={s.href}
          className="p-5 rounded-xl bg-muted/20 border border-border/30 hover:border-accent/20 hover:bg-muted/40 transition-all group"
        >
          <s.icon className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors mb-3" />
          <p className="text-sm font-semibold text-foreground">{s.label}</p>
          <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
        </Link>
      ))}
    </div>
  </AdminLayout>
);

export default AdminProgramm;
