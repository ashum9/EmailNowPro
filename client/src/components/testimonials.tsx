export default function Testimonials() {
  const testimonials = [
    // Column 1
    [
      {
        name: "Sarah Johnson",
        role: "Marketing Director at TechCorp",
        message: "EmailNow has revolutionized our email campaigns. The automation features saved us hours of manual work and improved our conversion rates by 40%."
      },
      {
        name: "Michael Chen",
        role: "CEO at StartupX",
        message: "The HR database integration is incredible. We've connected with top talent across the industry and streamlined our recruitment process completely."
      },
      {
        name: "Emily Rodriguez",
        role: "Growth Manager at InnovateTech",
        message: "Clean, professional interface with powerful features. The bulk email functionality works flawlessly and the analytics are comprehensive."
      },
      {
        name: "David Kim",
        role: "Founder at CloudTech",
        message: "Outstanding deliverability rates and excellent customer support. EmailNow has become an essential part of our marketing stack."
      }
    ],
    // Column 2
    [
      {
        name: "Lisa Wang",
        role: "Head of Sales at GlobalCorp",
        message: "The SMTP flexibility is amazing. We can use our own email infrastructure while leveraging EmailNow's powerful automation features."
      },
      {
        name: "James Wilson",
        role: "Marketing Lead at FutureSoft",
        message: "Real-time analytics and spam score checking have improved our email performance dramatically. Highly recommended for serious marketers."
      },
      {
        name: "Maria Garcia",
        role: "Business Developer at MegaCorp",
        message: "The domain warmup support helped us establish excellent sender reputation. Our emails now consistently reach the inbox."
      },
      {
        name: "Robert Taylor",
        role: "VP Marketing at HealthTech",
        message: "Cold email rate limiting and automatic retry features are game-changers. Our outreach campaigns are now more effective than ever."
      }
    ],
    // Column 3
    [
      {
        name: "Jennifer Brown",
        role: "Digital Marketing Manager at FinTech",
        message: "Bank-level encryption and security features give us peace of mind. Perfect for handling sensitive business communications."
      },
      {
        name: "Kevin Zhang",
        role: "Growth Hacker at EduTech",
        message: "99.9% uptime and lightning-fast delivery. EmailNow never lets us down during critical campaign launches."
      },
      {
        name: "Amanda Miller",
        role: "Content Director at RetailTech",
        message: "The user interface is intuitive and the features are comprehensive. Everything we need for professional email automation."
      },
      {
        name: "Christopher Lee",
        role: "Marketing Strategist at BioTech",
        message: "Global delivery network ensures our emails reach recipients worldwide. The international reach is impressive."
      }
    ]
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 clean-text">
            What Our Clients Say
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Trusted by thousands of businesses worldwide for their email automation needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 h-64 md:h-80 lg:h-96 overflow-hidden">
          {testimonials.map((column, columnIndex) => (
            <div key={columnIndex} className="testimonial-column">
              <div className="testimonial-scroll">
                {/* Duplicate testimonials for infinite scroll */}
                {[...column, ...column].map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm leading-relaxed italic">
                        "{testimonial.message}"
                      </p>
                    </div>
                    <div className="border-t border-white/10 pt-4">
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}