import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PhilosophySection from "@/components/PhilosophySection";
import CollectionSection from "@/components/CollectionSection";
import CraftSection from "@/components/CraftSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <PhilosophySection />
      <CollectionSection />
      <CraftSection />
      <FooterSection />
    </div>
  );
};

export default Index;
