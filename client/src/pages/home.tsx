import AuroraBackground from "@/components/aurora-background";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import EmailComposer from "@/components/email-composer";
import FeaturesSection from "@/components/features-section";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--dark-slate)] text-[var(--light-text)] overflow-x-hidden">
      <AuroraBackground />
      <Navigation />
      <HeroSection />
      <EmailComposer />
      <FeaturesSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
