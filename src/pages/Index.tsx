import Navigation from "@/components/landing/Navigation";
import HeroSection from "@/components/landing/HeroSection";
import USPSection from "@/components/landing/USPSection";
import ShowkonzepteSection from "@/components/landing/ShowkonzepteSection";
import AnlassSection from "@/components/landing/AnlassSection";
import UeberMichSection from "@/components/landing/UeberMichSection";
import ErfolgeSection from "@/components/landing/ErfolgeSection";
import GalerieSection from "@/components/landing/GalerieSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <USPSection />
        <ShowkonzepteSection />
        <AnlassSection />
        <UeberMichSection />
        <ErfolgeSection />
        <GalerieSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
};

export default Index;
