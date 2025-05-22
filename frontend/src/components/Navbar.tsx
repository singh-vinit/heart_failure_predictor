"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center">
            <HeartPulse className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-blue-900">HFRP</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Benefits</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Resources</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50">Log In</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200">
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Features</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Benefits</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">Resources</a>
            <a href="#" className="block py-2 text-gray-600 hover:text-blue-600">About</a>
            <div className="mt-4 flex flex-col space-y-2">
              <Button variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">Log In</Button>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;