"use client";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { useRef } from "react";


export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
const benefitsRef = useRef<HTMLDivElement>(null);

const scrollToFeatures = () => {
  featuresRef.current?.scrollIntoView({ behavior: "smooth" });
};

const scrollToBenefits = () => {
  benefitsRef.current?.scrollIntoView({ behavior: "smooth" });
};

  return <div className="min-h-screen">
    <Navbar scrollToFeatures={scrollToFeatures} scrollToBenefits={scrollToBenefits} />

    <Hero />
    <HowItWorks />
    <Benefits ref={benefitsRef} />
    <Features ref={featuresRef} />
    <CallToAction />
    <Footer />
  </div>;
}
