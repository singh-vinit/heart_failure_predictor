"use client";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Navbar from "@/components/Navbar";
import Benefits from "@/components/Benefits";
import Features from "@/components/Features";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToBenefits = () => {
    benefitsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      className="min-h-screen"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Navbar */}
      <motion.div variants={itemVariants}>
        <Navbar
          scrollToFeatures={scrollToFeatures}
          scrollToBenefits={scrollToBenefits}
        />
      </motion.div>

      {/* Hero Section */}
      <motion.div variants={itemVariants}>
        <Hero />
      </motion.div>

      {/* How It Works Section */}
      <motion.div variants={itemVariants}>
        <HowItWorks />
      </motion.div>

      {/* Benefits Section */}
      <motion.div variants={itemVariants}>
        <Benefits ref={benefitsRef} />
      </motion.div>

      {/* Features Section */}
      <motion.div variants={itemVariants}>
        <Features ref={featuresRef} />
      </motion.div>

      {/* Call to Action Section */}
      <motion.div variants={itemVariants}>
        <CallToAction />
      </motion.div>

      {/* Footer */}
      <motion.div variants={itemVariants}>
        <Footer />
      </motion.div>
    </motion.div>
  );
}