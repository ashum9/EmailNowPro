import { Button } from "@/components/ui/button";
import { Rocket, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="hero-title text-4xl md:text-6xl font-bold mb-6">
          <span className="clean-text">Email Automation</span>
          <br />
          <span className="clean-text">Simplified</span>
        </h1>
        <p className="hero-subtitle text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Send targeted emails to individuals or reach hundreds of HR professionals with our advanced automation platform.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="clean-button px-8 py-4 text-lg font-semibold">
            <Rocket className="mr-2 h-5 w-5" />
            Start Free Trial
          </Button>
          <Button variant="outline" className="border-white/20 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10">
            <Play className="mr-2 h-5 w-5" />
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  );
}
