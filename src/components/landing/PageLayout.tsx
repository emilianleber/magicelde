import Navigation from "./Navigation";
import Footer from "./Footer";
import Chatbot from "./Chatbot";
import WhatsAppButton from "./WhatsAppButton";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <Navigation />
    <main>{children}</main>
    <Footer />
    <Chatbot />
    <WhatsAppButton />
  </>
);

export default PageLayout;
