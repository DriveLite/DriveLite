import FeatureSection from "./FeatureSection";
import FooterSection from "./FooterSection";
import HeroSection from "./HeroSection";
import LogoSection from "./logoSection";
import OSSSection from "./OSSSection";
import WaitlistSection from "./WailtistSection";

export default function MainPage() {
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
