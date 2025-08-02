import LogoSection from "@/Components/logoSection";
import HeroSection from "@/Components/HeroSection";
import FeatureSection from "@/Components/FeatureSection";
import OSSSection from "@/Components/OSSSection";
import WaitlistSection from "@/Components/WailtistSection";
import FooterSection from "@/Components/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
      <LogoSection />
      <HeroSection />
      <FeatureSection />
      <OSSSection />
      <WaitlistSection />
      <FooterSection />
    </main>
  );
}
