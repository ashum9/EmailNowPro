import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 border-t border-[var(--light-text)]/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">EmailNow</h3>
            <p className="text-gray-300 mb-6">
              The most powerful email automation platform for modern businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-[var(--primary)] transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--primary)] transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-[var(--primary)] transition-colors">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  API
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Integrations
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[var(--primary)] transition-colors">
                  Status
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[var(--light-text)]/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 EmailNow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
