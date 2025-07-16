export default function BenefitCards() {
  const benefits = [
    {
      title: "Cold Email Rate Limiting",
      description: "Intelligent throttling to maintain sender reputation and avoid spam filters"
    },
    {
      title: "Built-in Analytics",
      description: "Track open rates, click-through rates, and engagement metrics in real-time"
    },
    {
      title: "Spam Score Checker",
      description: "Pre-flight email analysis to optimize deliverability before sending"
    },
    {
      title: "Domain Warmup Support",
      description: "Gradual volume increase to establish trust with email providers"
    },
    {
      title: "SMTP Flexibility",
      description: "Connect any SMTP provider or use our optimized email infrastructure"
    },
    {
      title: "Automatic Retry Engine",
      description: "Smart retry logic for failed deliveries with exponential backoff"
    }
  ];

  return (
    <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 clean-text">
            Advanced Features
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Professional email automation tools designed for modern businesses
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <div className="flex space-x-6 pb-6" style={{ minWidth: 'fit-content' }}>
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-card">
                <h3 className="text-xl font-semibold mb-3 clean-text">
                  {benefit.title}
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}