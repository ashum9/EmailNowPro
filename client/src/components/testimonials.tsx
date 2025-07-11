export default function Testimonials() {
  const testimonials = ;

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