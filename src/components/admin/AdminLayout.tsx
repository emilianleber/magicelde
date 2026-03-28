import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import PageLayout from "@/components/landing/PageLayout";
import {
  LayoutDashboard,
  MessageCircle,
  Calendar,
  Users,
  CheckSquare,
} from "lucide-react";

interface AdminLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const navItems = [
  {
    label: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    label: "Anfragen",
    href: "/admin/requests",
    icon: MessageCircle,
  },
  {
    label: "Events",
    href: "/admin/events",
    icon: Calendar,
  },
  {
    label: "Kunden",
    href: "/admin/customers",
    icon: Users,
  },
  {
    label: "Todos",
    href: "/admin/todos",
    icon: CheckSquare,
  },
];

const AdminLayout = ({
  title,
  subtitle,
  actions,
  children,
}: AdminLayoutProps) => {
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
                  <h2 className="font-display text-xl font-bold text-foreground">
                    Übersicht
                  </h2>
                </div>

                <nav className="mt-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive =
                      location.pathname === item.href ||
                      (item.href !== "/admin" &&
                        location.pathname.startsWith(item.href));

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
                  <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="font-sans text-sm text-muted-foreground mt-2">
                      {subtitle}
                    </p>
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

export default AdminLayout;
