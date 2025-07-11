import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Rocket, Calendar } from "lucide-react";

type CtaSectionProps = {
  onStartFreeTrial?: () => void;
};

export default function CtaSection({ onStartFreeTrial }: CtaSectionProps) {
  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <Card className="glass-effect border-white/10 bg-transparent">
          <CardContent className="p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 clean-text">
              Ready to Transform
              <br />
              Your Email Campaigns?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who trust EmailNow for their email automation needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="clean-button px-8 py-4 text-lg font-semibold" onClick={onStartFreeTrial}>
                <Rocket className="mr-2 h-5 w-5" />
                Start Free Trial
              </Button>
              <Button variant="outline" className="border-white/20 px-8 py-4 text-lg font-semibold text-white hover:bg-white/10">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule Demo
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
