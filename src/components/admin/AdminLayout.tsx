import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  Users,
  CheckSquare,
  Mail,
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const navItems = [
  { label: "Dashboard",   href: "/admin",           icon: LayoutDashboard },
  { label: "Anfragen",    href: "/admin/requests",  icon: MessageCircle },
  { label: "Events",      href: "/admin/events",    icon: Calendar },
  { label: "Kunden",      href: "/admin/customers", icon: Users },
  { label: "Mails",       href: "/admin/mails",     icon: Mail },
  { label: "Todos",       href: "/admin/todos",      icon: CheckSquare },
  { label: "Einstellungen", href: "/admin/settings", icon: Settings },
];

const IS_ADMIN_DOMAIN = window.location.hostname === "admin.magicel.de";

// ── Standalone sidebar (used on admin.magicel.de) ─────────────────────────────
const StandaloneAdminLayout = ({ title, subtitle, actions, children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">

      {/* ── Sidebar ── */}
      <aside className="w-[240px] shrink-0 flex flex-col border-r border-border/30 bg-muted/10">

        {/* Brand */}
        <div className="flex items-center gap-3 px-5 py-5 border-b border-border/20">
          <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-background" />
          </div>
          <div>
            <p className="text-sm font-bold text-foreground leading-none">Emilian Leber</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">CRM</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (item.href !== "/admin" && location.pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "bg-foreground text-background font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                }`}
              >
                <item.icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="px-3 py-4 border-t border-border/20">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Abmelden</span>
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <header className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-border/20 bg-background/80 backdrop-blur-sm">
          <div>
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
              Admin / CRM
            </p>
            <h1 className="text-xl font-bold text-foreground leading-tight">{title}</h1>
            {subtitle && <p className="text-sm text-muted-foreground mt-0.5">{subtitle}</p>}
          </div>
          {actions && <div>{actions}</div>}
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {children}
        </main>
      </div>
    </div>
  );
};

// ── Legacy layout (used on magicel.de / localhost inside PageLayout) ──────────
const EmbeddedAdminLayout = ({ title, subtitle, actions, children }: AdminLayoutProps) => {
  const location = useLocation();

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6">
          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl border border-border/30 bg-muted/20 p-4">
                <div className="px-3 pt-2 pb-4 border-b border-border/20">
                  <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    Admin / CRM
                  </p>
                  <h2 className="font-display text-xl font-bold text-foreground">Übersicht</h2>
                </div>
                <nav className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      location.pathname === item.href ||
                      (item.href !== "/admin" && location.pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
                          isActive
                            ? "bg-background text-foreground shadow-sm border border-border/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>

            <main className="min-w-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">
                    Admin / CRM
                  </p>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
                  {subtitle && (
                    <p className="font-sans text-sm text-muted-foreground mt-2">{subtitle}</p>
                  )}
                </div>
                {actions && <div className="w-full sm:w-auto">{actions}</div>}
              </div>
              {children}
            </main>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

// ── Export: auto-selects based on domain ──────────────────────────────────────
const AdminLayout = (props: AdminLayoutProps) =>
  IS_ADMIN_DOMAIN ? <StandaloneAdminLayout {...props} /> : <EmbeddedAdminLayout {...props} />;

export default AdminLayout;
