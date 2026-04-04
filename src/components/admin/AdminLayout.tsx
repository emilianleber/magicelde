import React, { createContext, useContext, useLayoutEffect, useMemo, ReactNode, useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import { supabase } from "@/integrations/supabase/client";
import {
  LayoutDashboard,
  MessageCircle,
  CalendarDays,
  Users,
  Settings,
  LogOut,
  Zap,
  Menu,
  X,
  FileText,
  CalendarRange,
  Wand2,
} from "lucide-react";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

// ── Nav structure ────────────────────────────────────────────────────────────

const mainNavItems = [
  { label: "Dashboard",           href: "/admin",            icon: LayoutDashboard },
  { label: "Anfragen & Buchungen", href: "/admin/bookings",  icon: MessageCircle,  badge: true },
  { label: "Kunden",              href: "/admin/customers",  icon: Users },
  { label: "Kalender",            href: "/admin/kalender",   icon: CalendarRange },
  { label: "Dokumente",           href: "/admin/dokumente",  icon: FileText },
  { label: "Mein Programm",       href: "/admin/programm",   icon: Wand2 },
  { label: "Einstellungen",       href: "/admin/settings",   icon: Settings },
];

const bottomNavItems = [
  { label: "Dashboard",  href: "/admin",            icon: LayoutDashboard },
  { label: "Anfragen",   href: "/admin/bookings",   icon: MessageCircle,  badge: true },
  { label: "Kunden",     href: "/admin/customers",   icon: Users },
  { label: "Kalender",   href: "/admin/kalender",    icon: CalendarRange },
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

// ── Sub-NavLink (eingerückt unter Eltern-Eintrag) ────────────────────────────

interface SubNavLinkProps {
  href: string;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const SubNavLink = ({ href, label, isActive, onClick }: SubNavLinkProps) => (
  <Link
    to={href}
    onClick={onClick}
    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-[13px] transition-all ${
      isActive
        ? "text-foreground font-semibold"
        : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
    }`}
  >
    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isActive ? "bg-foreground" : "bg-border"}`} />
    {label}
  </Link>
);

// ── Header Context ────────────────────────────────────────────────────────────

interface AdminHeaderContextValue {
  setTitle: (t: string) => void;
  setSubtitle: (s: string | undefined) => void;
  setActions: (a: ReactNode | undefined) => void;
  isShell: boolean;
}

const AdminHeaderContext = createContext<AdminHeaderContextValue>({
  setTitle: () => {},
  setSubtitle: () => {},
  setActions: () => {},
  isShell: false,
});

// ── AdminPersistentShell: persistente Parent-Route (Sidebar bleibt stabil) ───

export const AdminPersistentShell = () => {
  const [title, setTitle] = useState("Admin");
  const [subtitle, setSubtitle] = useState<string | undefined>(undefined);
  const [actions, setActions] = useState<ReactNode>(undefined);

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

  useEffect(() => {
    supabase
      .from("portal_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "neu")
      .then(({ count }) => setNewRequestCount(count || 0));
  }, [location.pathname]);

  // Stable context value – only setters, not state
  const contextValue = useMemo<AdminHeaderContextValue>(() => ({
    setTitle,
    setSubtitle,
    setActions,
    isShell: true,
  }), []);

  const renderNav = (mobile = false, onClose?: () => void) => (
    <nav className="flex-1 overflow-y-auto px-3 py-4">
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

      <SectionLabel label="Kommunikation" />
      {komNavItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} isActive={isActive(item.href)} mobile={mobile} onClick={onClose} />
      ))}

      <SectionLabel label="Finanzen" />
      <NavLink
        href="/admin/dokumente"
        label="Dokumente"
        icon={FileText}
        isActive={location.pathname.startsWith("/admin/dokumente")}
        mobile={mobile}
        onClick={onClose}
      />
      {location.pathname.startsWith("/admin/dokumente") && (
        <div className="ml-2 pl-3 border-l border-border/20 mt-0.5 mb-1 space-y-0.5">
          <SubNavLink href="/admin/dokumente/angebote" label="Angebote" isActive={location.pathname.startsWith("/admin/dokumente/angebote")} onClick={onClose} />
          <SubNavLink href="/admin/dokumente/auftragsbestaetigung" label="Auftragsbestät." isActive={location.pathname.startsWith("/admin/dokumente/auftragsbestaetigung")} onClick={onClose} />
          <SubNavLink href="/admin/dokumente/rechnungen" label="Rechnungen" isActive={location.pathname.startsWith("/admin/dokumente/rechnungen")} onClick={onClose} />
          <SubNavLink href="/admin/dokumente/mahnungen" label="Mahnungen" isActive={location.pathname.startsWith("/admin/dokumente/mahnungen")} onClick={onClose} />
        </div>
      )}
      <NavLink href="/admin/artikel" label="Artikel" icon={ShoppingBag} isActive={isActive("/admin/artikel")} mobile={mobile} onClick={onClose} />

      <SectionLabel label="Produktionen" />
      {prodNavItems.map((item) => (
        <NavLink key={item.href} href={item.href} label={item.label} icon={item.icon} isActive={isActive(item.href)} mobile={mobile} onClick={onClose} />
      ))}

      <SectionLabel label="System" />
      <NavLink href="/admin/settings" label="Einstellungen" icon={Settings} isActive={isActive("/admin/settings")} mobile={mobile} onClick={onClose} />
    </nav>
  );

  return (
    <AdminHeaderContext.Provider value={contextValue}>
      <div className="flex overflow-hidden bg-background" style={{ height: "100dvh", paddingTop: "env(safe-area-inset-top)" }}>

        {/* ── Desktop Sidebar ── */}
        <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-border/30 bg-muted/10">
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

          {/* Content – Outlet for child routes */}
          <main
            className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 lg:py-6"
            style={{ paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))" }}
          >
            <div className="lg:pb-0">
              <Outlet />
            </div>
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
    </AdminHeaderContext.Provider>
  );
};

// ── AdminLayout: thin wrapper used by each page ───────────────────────────────
// If inside AdminPersistentShell: updates header context + renders children only
// Otherwise: full standalone layout (fallback, e.g. EmbeddedAdminLayout)

const AdminLayout = ({ title, subtitle, actions, children }: AdminLayoutProps) => {
  const { setTitle, setSubtitle, setActions, isShell } = useContext(AdminHeaderContext);

  // Synchronously update the shell header before paint (no title flash)
  useLayoutEffect(() => {
    if (isShell) {
      setTitle(title);
      setSubtitle(subtitle);
      setActions(actions);
    }
  });

  // Inside persistent shell: just render children (shell provides sidebar + header)
  if (isShell) {
    return <>{children}</>;
  }

  // Fallback: standalone or embedded layout
  return IS_ADMIN_DOMAIN
    ? <StandaloneAdminLayout title={title} subtitle={subtitle} actions={actions}>{children}</StandaloneAdminLayout>
    : <EmbeddedAdminLayout title={title} subtitle={subtitle} actions={actions}>{children}</EmbeddedAdminLayout>;
};

// ── Standalone sidebar (fallback wenn keine Shell vorhanden) ─────────────────

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

  useEffect(() => {
    supabase
      .from("portal_requests")
      .select("*", { count: "exact", head: true })
      .eq("status", "neu")
      .then(({ count }) => setNewRequestCount(count || 0));
  }, [location.pathname]);

  const renderNav = (mobile = false, onClose?: () => void) => (
    <nav className={`flex-1 overflow-y-auto px-3 py-4`}>
      {mainNavItems.map((item) => (
        <React.Fragment key={item.href}>
          <NavLink
            href={item.href}
            label={item.label}
            icon={item.icon}
            badge={"badge" in item && (item as any).badge}
            badgeCount={"badge" in item && (item as any).badge ? newRequestCount : undefined}
            isActive={isActive(item.href)}
            mobile={mobile}
            onClick={onClose}
          />
          {/* Dokumente sub-links */}
          {item.href === "/admin/dokumente" && location.pathname.startsWith("/admin/dokumente") && (
            <div className="ml-2 pl-3 border-l border-border/20 mt-0.5 mb-1 space-y-0.5">
              <SubNavLink href="/admin/dokumente/angebote" label="Angebote" isActive={location.pathname.startsWith("/admin/dokumente/angebote")} onClick={onClose} />
              <SubNavLink href="/admin/dokumente/rechnungen" label="Rechnungen" isActive={location.pathname.startsWith("/admin/dokumente/rechnungen")} onClick={onClose} />
              <SubNavLink href="/admin/dokumente/auftragsbestaetigung" label="Auftragsbestät." isActive={location.pathname.startsWith("/admin/dokumente/auftragsbestaetigung")} onClick={onClose} />
              <SubNavLink href="/admin/dokumente/mahnungen" label="Mahnungen" isActive={location.pathname.startsWith("/admin/dokumente/mahnungen")} onClick={onClose} />
            </div>
          )}
        </React.Fragment>
      ))}
    </nav>
  );

  return (
    <div className="flex overflow-hidden bg-background" style={{ height: "100dvh", paddingTop: "env(safe-area-inset-top)" }}>

      <aside className="hidden lg:flex w-[220px] shrink-0 flex-col border-r border-border/30 bg-muted/10">
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

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
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

        <main
          className="flex-1 overflow-y-auto px-4 lg:px-6 py-4 lg:py-6"
          style={{ paddingBottom: "max(1.5rem, calc(env(safe-area-inset-bottom) + 4.5rem))" }}
        >
          <div className="lg:pb-0">{children}</div>
        </main>
      </div>

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

  const allNavItems = mainNavItems;

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
export default AdminLayout;
