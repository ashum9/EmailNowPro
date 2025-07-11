import { Card, CardContent } from "@/components/ui/card";
import { 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  Settings, 
  Headphones 
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Send emails instantly with our optimized Nodemailer integration and advanced queuing system.",
      color: "text-white",
      bgColor: "bg-white/20",
    },
    {
      icon: Users,
      title: "HR Database",
      description: "Access our curated database of HR professionals and recruiters from top companies.",
      color: "text-white",
      bgColor: "bg-white/20",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track delivery rates, open rates, and engagement metrics with detailed reporting.",
      color: "text-white",
      bgColor: "bg-white/20",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime and data encryption.",
      color: "text-white",
      bgColor: "bg-white/20",
    },
    {
      icon: Settings,
      title: "Customizable",
      description: "Personalize your emails with dynamic content and advanced template system.",
      color: "text-white",
      bgColor: "bg-white/20",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team.",
      color: "text-white",
      bgColor: "bg-white/20",
    },
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 clean-text">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to run successful email campaigns with advanced automation and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="email-card rounded-xl hover:scale-105 transition-transform border-[var(--light-text)]/10">
              <CardContent className="p-6">
                <div className={`w-12 h-12 ${feature.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`${feature.color} text-xl`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
