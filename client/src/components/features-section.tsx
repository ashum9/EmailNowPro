import { useEffect, useRef, useState } from "react";
import { 
  Zap, 
  Users, 
  BarChart3, 
  Shield, 
  Settings, 
  Headphones,
  Mail,
  Clock,
  Target,
  TrendingUp,
  Lock,
  Cpu
} from "lucide-react";

export default function FeaturesSection() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Send emails instantly with our optimized Nodemailer integration and advanced queuing system.",
    },
    {
      icon: Users,
      title: "HR Database",
      description: "Access our curated database of HR professionals and recruiters from top companies.",
    },
    {
      icon: BarChart3,
      title: "Analytics",
      description: "Track delivery rates, open rates, and engagement metrics with detailed reporting.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime and data encryption.",
    },
    {
      icon: Settings,
      title: "Customizable",
      description: "Personalize your emails with dynamic content and advanced template system.",
    },
    {
      icon: Headphones,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated support team.",
    },
    {
      icon: Mail,
      title: "Custom SMTP",
      description: "Use your own email infrastructure with complete flexibility and control.",
    },
    {
      icon: Clock,
      title: "Automated Scheduling",
      description: "Schedule campaigns and follow-ups with precision timing controls.",
    },
    {
      icon: Target,
      title: "Precise Targeting",
      description: "Advanced segmentation and targeting options for maximum relevance.",
    },
    {
      icon: TrendingUp,
      title: "Growth Tracking",
      description: "Monitor your email performance and growth metrics over time.",
    },
    {
      icon: Lock,
      title: "Compliance Ready",
      description: "Built-in GDPR and CAN-SPAM compliance features for legal safety.",
    },
    {
      icon: Cpu,
      title: "AI-Powered",
      description: "Machine learning algorithms optimize delivery times and content.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress when section is in view
      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 clean-text">
            Advanced Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Everything you need to run successful email campaigns with advanced automation and analytics.
          </p>
        </div>
        
        <div className="horizontal-scroll-container">
          <div 
            className="horizontal-scroll-content"
            style={{ 
              transform: `translateX(-${scrollProgress * 30}%)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            {features.map((feature, index) => (
              <div key={index} className="horizontal-scroll-item">
                <div className="group bg-black/60 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-black/80 transition-all duration-300 hover:scale-105 w-80 h-48">
                  <div className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-lg mb-4 group-hover:bg-white/20 transition-colors">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 clean-text">{feature.title}</h3>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <div className="flex space-x-2">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  scrollProgress > i * 0.2 ? 'bg-white' : 'bg-white/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
