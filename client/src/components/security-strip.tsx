export default function SecurityStrip() {
  const securityFeatures = [
    "Bank-level Encryption",
    "Spam Protection",
    "Global Delivery",
    "End-to-End Security",
    "Lightning Fast",
    "99.9% Uptime",
    "GDPR Compliant",
    "SOC 2 Certified",
    "Multi-Factor Auth",
    "Real-time Monitoring",
    "Data Encryption",
    "Secure API Access"
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedFeatures = [...securityFeatures, ...securityFeatures];

  return (
    <section className="relative z-10 py-6">
      <div className="security-strip">
        <div className="security-scroll">
          {duplicatedFeatures.map((feature, index) => (
            <div key={index} className="security-badge">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}