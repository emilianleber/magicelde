import Navigation from "./Navigation";
import Footer from "./Footer";

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => (
  <>
    <Navigation />
    <main>{children}</main>
    <Footer />
  </>
);

export default PageLayout;
