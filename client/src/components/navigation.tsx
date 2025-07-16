import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 glass-effect">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold clean-text">EmailNow</h1>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Features
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Pricing
              </a>
              <a href="#" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white transition-colors">
                Support
              </a>
              <Button className="clean-button">Get Started</Button>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
