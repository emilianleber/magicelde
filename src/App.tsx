import AdminDashboard from "@/pages/AdminDashboard";
import AdminEffekte from "@/pages/AdminEffekte";
import AdminRequests from "@/pages/AdminRequests";
import AdminRequestDetail from "@/pages/AdminRequestDetail";
import AdminEvents from "@/pages/AdminEvents";
import AdminEventDetail from "@/pages/AdminEventDetail";
import AdminNewRequest from "@/pages/AdminNewRequest";
import AdminNewEvent from "@/pages/AdminNewEvent";
import AdminMails from "@/pages/AdminMails";
import AdminCustomers from "@/pages/AdminCustomers";
import AdminCustomerDetail from "@/pages/AdminCustomerDetail";
import AdminNewCustomer from "@/pages/AdminNewCustomer";
import AdminSettings from "@/pages/AdminSettings";
import AdminTodos from "@/pages/AdminTodos";
import AdminDocuments from "@/pages/AdminDocuments";
import AdminLogin from "@/pages/AdminLogin";
import AdminPasswordReset from "@/pages/AdminPasswordReset";

import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";

import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import Index from "./pages/Index.tsx";
import Hochzeit from "./pages/Hochzeit.tsx";
import Firmenfeiern from "./pages/Firmenfeiern.tsx";
import Geburtstage from "./pages/Geburtstage.tsx";
import Buehnenshow from "./pages/Buehnenshow.tsx";
import CloseUp from "./pages/CloseUp.tsx";
import MagicDinner from "./pages/MagicDinner.tsx";
import Moderation from "./pages/Moderation.tsx";
import UeberMich from "./pages/UeberMich.tsx";
import Referenzen from "./pages/Referenzen.tsx";
import FAQPage from "./pages/FAQ.tsx";
import Presse from "./pages/Presse.tsx";
import Kontakt from "./pages/Kontakt.tsx";
import Buchung from "./pages/Buchung.tsx";
import Danke from "./pages/Danke.tsx";
import Blog from "./pages/Blog.tsx";
import BlogPost from "./pages/BlogPost.tsx";
import Tickets from "./pages/Tickets.tsx";
import Datenschutz from "./pages/Datenschutz.tsx";
import Impressum from "./pages/Impressum.tsx";
import AGB from "./pages/AGB.tsx";
import StadtSeite from "./pages/StadtSeite.tsx";

import KundenportalLogin from "./pages/KundenportalLogin.tsx";
import Kundenportal from "./pages/Kundenportal.tsx";

import NotFound from "./pages/NotFound.tsx";
import ScrollToTop from "./components/ScrollToTop.tsx";
import { supabase } from "@/integrations/supabase/client";

const queryClient = new QueryClient();

// Hostname detection – admin.magicel.de = CRM only, magicel.de = public + portal
const hostname = window.location.hostname;
const IS_ADMIN_DOMAIN = hostname === "admin.magicel.de";
const IS_DEV = hostname === "localhost" || hostname === "127.0.0.1";

// Catches PASSWORD_RECOVERY event fired from any page
const AuthEventHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/admin/passwort-setzen");
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);
  return null;
};

// ── Admin CRM routes (only on admin.magicel.de or localhost) ─────────────────
const AdminRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/admin/customers" replace />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/requests" element={<AdminRequests />} />
    <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
    <Route path="/admin/events" element={<AdminEvents />} />
    <Route path="/admin/events/:id" element={<AdminEventDetail />} />
    <Route path="/admin/new-request" element={<AdminNewRequest />} />
    <Route path="/admin/requests/new" element={<AdminNewRequest />} />
    <Route path="/admin/events/new" element={<AdminNewEvent />} />
    <Route path="/admin/mails" element={<AdminMails />} />
    <Route path="/admin/customers" element={<AdminCustomers />} />
    <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
    <Route path="/admin/customers/new" element={<AdminNewCustomer />} />
    <Route path="/admin/settings" element={<AdminSettings />} />
    <Route path="/admin/todos" element={<AdminTodos />} />
    <Route path="/admin/documents" element={<AdminDocuments />} />
    <Route path="/admin/documents/angebote" element={<AdminDocuments />} />
    <Route path="/admin/documents/rechnungen" element={<AdminDocuments />} />
    <Route path="/admin/documents/auftragsbestaetigung" element={<AdminDocuments />} />
    <Route path="/admin/effekte" element={<AdminEffekte />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/passwort-setzen" element={<AdminPasswordReset />} />
    <Route path="*" element={<Navigate to="/admin/customers" replace />} />
  </Routes>
);

// ── Public website + Kundenportal routes (magicel.de) ────────────────────────
const PublicRoutes = () => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/hochzeit" element={<Hochzeit />} />
    <Route path="/firmenfeiern" element={<Firmenfeiern />} />
    <Route path="/geburtstage" element={<Geburtstage />} />
    <Route path="/buehnenshow" element={<Buehnenshow />} />
    <Route path="/close-up" element={<CloseUp />} />
    <Route path="/magic-dinner" element={<MagicDinner />} />
    <Route path="/moderation" element={<Moderation />} />
    <Route path="/ueber-mich" element={<UeberMich />} />
    <Route path="/referenzen" element={<Referenzen />} />
    <Route path="/faq" element={<FAQPage />} />
    <Route path="/presse" element={<Presse />} />
    <Route path="/kontakt" element={<Kontakt />} />
    <Route path="/buchung" element={<Buchung />} />
    <Route path="/danke" element={<Danke />} />
    <Route path="/blog" element={<Blog />} />
    <Route path="/blog/:slug" element={<BlogPost />} />
    <Route path="/tickets" element={<Tickets />} />
    <Route path="/datenschutz" element={<Datenschutz />} />
    <Route path="/impressum" element={<Impressum />} />
    <Route path="/agb" element={<AGB />} />
    <Route path="/zauberer/:stadt" element={<StadtSeite />} />
    <Route path="/kundenportal/login" element={<KundenportalLogin />} />
    <Route path="/kundenportal" element={<Kundenportal />} />
    {/* Block admin on public domain */}
    <Route path="/admin/*" element={<Navigate to="/" replace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <AuthEventHandler />
        {IS_ADMIN_DOMAIN ? <AdminRoutes /> : IS_DEV ? (
          // localhost: beide Route-Sets verfügbar
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/hochzeit" element={<Hochzeit />} />
            <Route path="/firmenfeiern" element={<Firmenfeiern />} />
            <Route path="/geburtstage" element={<Geburtstage />} />
            <Route path="/buehnenshow" element={<Buehnenshow />} />
            <Route path="/close-up" element={<CloseUp />} />
            <Route path="/magic-dinner" element={<MagicDinner />} />
            <Route path="/moderation" element={<Moderation />} />
            <Route path="/ueber-mich" element={<UeberMich />} />
            <Route path="/referenzen" element={<Referenzen />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/presse" element={<Presse />} />
            <Route path="/kontakt" element={<Kontakt />} />
            <Route path="/buchung" element={<Buchung />} />
            <Route path="/danke" element={<Danke />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/agb" element={<AGB />} />
            <Route path="/zauberer/:stadt" element={<StadtSeite />} />
            <Route path="/kundenportal/login" element={<KundenportalLogin />} />
            <Route path="/kundenportal" element={<Kundenportal />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/requests" element={<AdminRequests />} />
            <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
            <Route path="/admin/events" element={<AdminEvents />} />
            <Route path="/admin/events/:id" element={<AdminEventDetail />} />
            <Route path="/admin/new-request" element={<AdminNewRequest />} />
            <Route path="/admin/requests/new" element={<AdminNewRequest />} />
            <Route path="/admin/events/new" element={<AdminNewEvent />} />
            <Route path="/admin/mails" element={<AdminMails />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
            <Route path="/admin/customers/new" element={<AdminNewCustomer />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            <Route path="/admin/todos" element={<AdminTodos />} />
            <Route path="/admin/documents" element={<AdminDocuments />} />
            <Route path="/admin/documents/angebote" element={<AdminDocuments />} />
            <Route path="/admin/documents/rechnungen" element={<AdminDocuments />} />
            <Route path="/admin/documents/auftragsbestaetigung" element={<AdminDocuments />} />
            <Route path="/admin/effekte" element={<AdminEffekte />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/passwort-setzen" element={<AdminPasswordReset />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        ) : <PublicRoutes />}
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
