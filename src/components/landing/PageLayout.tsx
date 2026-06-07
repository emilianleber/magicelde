import Chatbot from "./Chatbot";
import VoltageHeader from "@/components/voltage/VoltageHeader";
import VoltageFooter from "@/components/voltage/VoltageFooter";
import { VoltageGlobalStyle, WHITE, INK, SANS } from "@/components/voltage/theme";

interface PageLayoutProps {
  children: React.ReactNode;
}

/**
 * Live-Chrome: einheitlicher Voltage-Header/-Footer für alle Nicht-Demo-Seiten.
 * Header liegt als fixed-Overlay oben (wie der frühere fixe Navbar) — die Seiten
 * kompensieren bereits mit pt-28/pt-36, daher keine Layout-Verschiebung.
 */
const PageLayout = ({ children }: PageLayoutProps) => {
  // Header immer solide (lesbar über dunklen Hero-Sektionen UND auf weißen Seiten).
  return (
    <div className="voltage-root" style={{ background: WHITE, color: INK, fontFamily: SANS }}>
      <VoltageGlobalStyle />
      <div className="fixed top-0 left-0 right-0 z-50">
        <VoltageHeader scrolled={true} />
      </div>
      <main>{children}</main>
      <VoltageFooter />
      <Chatbot />
    </div>
  );
};

export default PageLayout;
