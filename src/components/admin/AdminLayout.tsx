import React, { ReactNode, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  MessageCircle,
  CalendarDays,
  Users,
  CheckSquare,
  Mail,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  Sparkles,
  Wand2,
  Package,
  Video,
  MapPin,
  Users2,
  Receipt,
  FileCheck,
  ShoppingBag,
  FileText,
  CalendarRange,
} from "lucide-react";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

// ── Nav structure ────────────────────────────────────────────────────────────

const crmNavItems = [
  { label: "Dashboard",  href: "/admin",           icon: LayoutDashboard },
  { label: "Anfragen",   href: "/admin/requests",  icon: MessageCircle,  badge: true },
  { label: "Events",     href: "/admin/events",    icon: CalendarDays },
  { label: "Kunden",     href: "/admin/customers", icon: Users },
  { label: "Kalender",   href: "/admin/kalender",  icon: CalendarRange },
];

const komNavItems = [
  { label: "Mails",  href: "/admin/mails",  icon: Mail },
  { label: "Todos",  href: "/admin/todos",  icon: CheckSquare },
];

const finanzNavItems = [
  { label: "Dokumente", href: "/admin/dokumente", icon: FileText },
  { label: "Artikel",   href: "/admin/artikel",   icon: ShoppingBag },
];

const prodNavItems = [
  { label: "Effekte",      href: "/admin/effekte",      icon: Wand2 },
  { label: "Pakete",       href: "/admin/pakete",       icon: Package },
  { label: "Shows",        href: "/admin/shows",        icon: Video },
  { label: "Produktionen", href: "/admin/produktionen", icon: Sparkles },
  { label: "Locations",    href: "/admin/locations",    icon: MapPin },
  { label: "Partner",      href: "/admin/partner",      icon: Users2 },
];

const bottomNavItems = [
  { label: "Dashboard", href: "/admin",           icon: LayoutDashboard },
  { label: "Anfragen",  href: "/admin/requests",  icon: MessageCircle,  badge: true },
  { label: "Events",    href: "/admin/events",    icon: CalendarDays },
  { label: "Kunden",    href: "/admin/customers", icon: Users },
  { label: "Finanzen",  href: "/admin/dokumente", icon: FileText },
];

const IS_ADMIN_DOMAIN = window.location.hostname === "admin.magicel.de" || window.location.hostname === "localhost";

// ── Reusable NavLink ─────────────────────────────────────────────────────────

interface NavLinkProps {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: boolean;
  badgeCount?: number;
  isActive: boolean;
  mobile?: boolean;
  onClick?: () => void;
}

const NavLink = ({ href, label, icon: Icon, badge, badgeCount, isActive, mobile, onClick }: NavLinkProps) => (
  <Link
    to={href}
    onClick={onClick}
    className={`flex items-center gap-3 rounded-xl px-3 ${mobile ? "py-3" : "py-2.5"} text-sm transition-all relative ${
      isActive
        ? "bg-foreground text-background font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
    }`}
  >
    <Icon className="w-4 h-4 shrink-0" />
    <span className="flex-1">{label}</span>
    {badge && badgeCount != null && badgeCount > 0 && (
      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center leading-none ${
        isActive ? "bg-background/20 text-background" : "bg-red-500 text-white"
      }`}>
        {badgeCount > 99 ? "99+" : badgeCount}
      </span>
    )}
  </Link>
);

// ── Section header ───────────────────────────────────────────────────────────

const SectionLabel = ({ label }: { label: string }) => (
  <div className="mt-5 mb-1.5 px-3">
    <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
      {label}
    </p>
  </div>
);

// ── Standalone sidebar (admin.magicel.de) ────────────────────────────────────

const StandaloneAdminLayout = ({ title, subtitle, actions, children }: AdminLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [newRequestCount, setNewRequestCount] = useState(0);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/admin/login");
  };

  const isActive = (href: string) =>
    location.pathname === href || (href !== "/admin" && location.pathname.startsWith(href));

  // Fetch new request count for badge
  useEffect(() => {
    supabase
      .from("portal_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "neu")
      .then(({ count }) => setNewRequestCount(count || 0));
  }, [location.pathname]);

  const renderNav = (mobile = false, onClose?: () => void) => (
    <nav className={`flex-1 overflow-y-auto px-3 py-4`}>
      {/* CRM */}
      {crmNavItems.map((item) => (
        <NavLink
          key={item.href}
          href={item.href}
          label={item.label}
          icon={item.icon}
          badge={item.badge}
          badgeCount={item.badge ? newRequestCount : undefined}
          isActive={isActive(item.href)}
          mobile={mobile}
          onClick={onClose}
        />
      ))}

      {/* Kommunikation */}
      <SectionLabel label="Kommunikation" />
      {komNavItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} isActive={isActive(item.href)} mobile={mobile} onClick={onClose} />
      ))}

      {/* Finanzen */}
      <SectionLabel label="Finanzen" />
      {finanzNavItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} isActive={isActive(item.href)} mobile={mobile} onClick={onClose} />
      ))}

      {/* Produktionen */}
      <SectionLabel label="Produktionen" />
      {prodNavItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} isActive={isActive(item.href)} mobile={mobile} onClick={onClose} />
      ))}

      {/* Einstellungen */}
      <SectionLabel label="System" />
      <NavLink href="/admin/settings" label="Einstellungen" icon={Settings} isActive={isActive("/admin/settings")} mobile={mobile} onClick={onClose} />
    </nav>
  );

  return (
    <div className="flex overflow-hidden bg-background" style={{ height: "100dvh", paddingTop: "env(safe-area-inset-top)" }}>

      {/* ── Desktop Sidebar ── */}
      <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-border/30 bg-muted/10">
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

        {renderNav(false)}

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

      {/* ── Mobile Slide-In Menu ── */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="relative w-[260px] flex flex-col bg-background border-r border-border/20 h-full z-10">
            <div className="flex items-center justify-between px-5 py-5 border-b border-border/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-foreground flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-background" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground leading-none">Emilian Leber</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">CRM</p>
                </div>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            {renderNav(true, () => setMobileMenuOpen(false))}
            <div className="px-3 py-4 border-t border-border/20" style={{ paddingBottom: "max(1rem, env(safe-area-inset-bottom))" }}>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-all"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Abmelden</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Top bar */}
        <header className="shrink-0 flex items-center gap-3 px-4 lg:px-6 py-3 lg:py-4 border-b border-border/20 bg-background/80 backdrop-blur-sm">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden flex items-center justify-center w-9 h-9 rounded-xl border border-border/30 text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <Menu className="w-4 h-4" />
          </button>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground hidden lg:block">Admin / CRM</p>
            <h1 className="text-base lg:text-xl font-bold text-foreground leading-tight truncate">{title}</h1>
            {subtitle && <p className="text-xs lg:text-sm text-muted-foreground mt-0.5 truncate">{subtitle}</p>}
          </div>
          {actions && <div className="shrink-0 flex items-center gap-2">{actions}</div>}
        </header>

        {/* Content */}
        <main
          className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 lg:py-6"
          style={{ paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))" }}
        >
          <div className="lg:pb-0">{children}</div>
        </main>
      </div>

      {/* ── Mobile Bottom Navigation ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border/20 z-40 flex items-center justify-around px-1"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {bottomNavItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              to={item.href}
              className={`relative flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl transition-all ${active ? "text-foreground" : "text-muted-foreground"}`}
            >
              <item.icon className={`w-5 h-5 ${active ? "stroke-[2.5]" : "stroke-[1.5]"}`} />
              <span className={`text-[10px] font-medium ${active ? "font-semibold" : ""}`}>{item.label}</span>
              {item.badge && newRequestCount > 0 && (
                <span className="absolute top-1.5 right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center">
                  {newRequestCount > 9 ? "9+" : newRequestCount}
                </span>
              )}
            </Link>
          );
        })}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-xl text-muted-foreground"
        >
          <Menu className="w-5 h-5 stroke-[1.5]" />
          <span className="text-[10px] font-medium">Mehr</span>
        </button>
      </nav>
    </div>
  );
};

// ── Legacy layout (magicel.de / localhost inside PageLayout) ──────────────────

const EmbeddedAdminLayout = ({ title, subtitle, actions, children }: AdminLayoutProps) => {
  const location = useLocation();
  const [newRequestCount, setNewRequestCount] = useState(0);

  const isActive = (href: string) =>
    location.pathname === href || (href !== "/admin" && location.pathname.startsWith(href));

  useEffect(() => {
    supabase.from("portal_requests").select("*", { count: "exact", head: true }).eq("status", "neu").then(({ count }) => setNewRequestCount(count || 0));
  }, [location.pathname]);

  const allNavItems = [
    ...crmNavItems,
    ...komNavItems,
    ...finanzNavItems,
    { label: "Einstellungen", href: "/admin/settings", icon: Settings },
  ];

  return (
    <PageLayout>
      <section className="min-h-screen pt-28 pb-16">
        <div className="container px-6">
          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-6">
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="rounded-3xl border border-border/30 bg-muted/20 p-4">
                <nav className="space-y-0.5">
                  {allNavItems.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all ${
                          active
                            ? "bg-background text-foreground shadow-sm border border-border/20"
                            : "text-muted-foreground hover:text-foreground hover:bg-background/60"
                        }`}
                      >
                        <item.icon className="w-4 h-4" />
                        <span className="font-medium flex-1">{item.label}</span>
                        {"badge" in item && item.badge && newRequestCount > 0 && (
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-red-500 text-white min-w-[18px] text-center">
                            {newRequestCount}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </aside>
            <main className="min-w-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                  <p className="font-sans text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Admin / CRM</p>
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{title}</h1>
                  {subtitle && <p className="font-sans text-sm text-muted-foreground mt-2">{subtitle}</p>}
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

// ── Export ────────────────────────────────────────────────────────────────────
const AdminLayout = (props: AdminLayoutProps) =>
  IS_ADMIN_DOMAIN ? <StandaloneAdminLayout {...props} /> : <EmbeddedAdminLayout {...props} />;

export default AdminLayout;
