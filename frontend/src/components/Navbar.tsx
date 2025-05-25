"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface NavbarProps {
  scrollToFeatures: () => void;
  scrollToBenefits: () => void;
}

const Navbar = ({ scrollToFeatures, scrollToBenefits }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const handleSignIn = () => {
    router.push("/signin");
  };
  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <nav className="bg-white py-4 sticky top-0 z-50">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <HeartPulse className="h-8 w-8 text-rose-600 mr-2" />
            <span className="text-xl font-bold text-rose-900">HFRP</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
          <Link href="/about" className="text-gray-600 hover:text-rose-600 transition-colors">About</Link>
          <button onClick={scrollToBenefits} className="text-gray-600 hover:text-rose-600 transition-colors">Benefits</button>
          <button onClick={scrollToFeatures} className="text-gray-600 hover:text-rose-600 transition-colors">Features</button>
            <div className="flex items-center space-x-4">
              <Button onClick={handleSignUp} variant="outline" className="border-rose-600 text-rose-600 hover:bg-rose-50 cursor-pointer">Sign Up</Button>
              <Button onClick={handleSignIn} className="bg-rose-500 hover:bg-rose-600 cursor-pointer">Sign In</Button>
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
            <Link href="/about" className="block py-2 text-gray-600 hover:text-rose-600">About</Link>
            <button onClick={scrollToBenefits} className="block py-2 text-gray-600 hover:text-rose-600">Benefits</button>
            <button onClick={scrollToFeatures} className="block py-2 text-gray-600 hover:text-rose-600">Features</button>
           
            
            <div className="mt-4 flex flex-col space-y-2">
            <div className="flex items-center space-x-4">
          <Button onClick={handleSignUp} variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
            Sign Up
          </Button>
          <Button onClick={handleSignIn} className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600">
            Sign In
          </Button>
        </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;