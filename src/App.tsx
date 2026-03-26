import AdminDashboard from "@/pages/AdminDashboard";
import AdminRequests from "@/pages/AdminRequests";
import AdminRequestDetail from "@/pages/AdminRequestDetail";
import AdminEvents from "@/pages/AdminEvents";
import AdminEventDetail from "@/pages/AdminEventDetail";
import AdminNewRequest from "@/pages/AdminNewRequest";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />

        <Routes>
          {/* Website */}
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

          {/* Kundenportal */}
          <Route path="/kundenportal/login" element={<KundenportalLogin />} />
          <Route path="/kundenportal" element={<Kundenportal />} />

          {/* Admin CRM */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/requests" element={<AdminRequests />} />
          <Route path="/admin/requests/:id" element={<AdminRequestDetail />} />
<Route path="/admin/events" element={<AdminEvents />} />
<Route path="/admin/events/:id" element={<AdminEventDetail />} />
<Route path="/admin/new-request" element={<AdminNewRequest />} />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
