import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function Home() {
  return <div className="min-h-screen">
    <Navbar />
    <Hero />
    <HowItWorks />
    <Benefits />
    <Features />
    <CallToAction />
    <Footer />
  </div>;
}
