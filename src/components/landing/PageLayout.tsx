import Navigation from "./Navigation";
import Footer from "./Footer";
import Chatbot from "./Chatbot";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <Navigation />
    <main>{children}</main>
    <Footer />
    <Chatbot />
  </>
);

export default PageLayout;
