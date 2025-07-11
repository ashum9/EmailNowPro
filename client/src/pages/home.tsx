import { useRef } from "react";
import AuroraBackground from "@/components/aurora-background";
import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import SecurityStrip from "@/components/security-strip";
import BenefitCards from "@/components/benefit-cards";
import EmailComposer from "@/components/email-composer";
import FeaturesSection from "@/components/features-section";
import Testimonials from "@/components/testimonials";
import CtaSection from "@/components/cta-section";
import Footer from "@/components/footer";

export default function Home() {
  const composerRef = useRef<HTMLDivElement>(null);
  const scrollToComposer = () => {
    composerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <AuroraBackground />
      <Navigation onGetStarted={scrollToComposer} />
      <HeroSection onStartFreeTrial={scrollToComposer} />
      <SecurityStrip />
      <BenefitCards />
      <div ref={composerRef}>
        <EmailComposer />
      </div>
      <FeaturesSection />
      <Testimonials />
      <CtaSection onStartFreeTrial={scrollToComposer} />
      <Footer />
    </div>
  );
}
