"use client";

import { useEffect, useState } from "react";

export default function ModelLoader() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-50 to-pink-50 p-8">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-32 h-32 border-4 border-rose-200 rounded-full animate-spin">
          <div className="w-6 h-6 bg-rose-500 rounded-full absolute -top-1 left-1/2 transform -translate-x-1/2"></div>
        </div>

        {/* Inner pulsing circle */}
        <div className="absolute inset-4 w-24 h-24 bg-gradient-to-r from-rose-400 to-pink-400 rounded-full animate-pulse flex items-center justify-center">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
            <div className="w-6 h-6 bg-rose-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>

      {/* Animated text */}
      <div className="mt-8 text-center">
        <h2 className="text-2xl font-semibold text-rose-700 mb-2">
          Model Analysis in Progress
        </h2>
        <p className="text-rose-600 text-lg">
          Making API call to model analysis{dots}
        </p>
      </div>

      {/* Animated dots */}
      <div className="flex space-x-2 mt-6">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-rose-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          ></div>
        ))}
      </div>

      {/* Progress waves */}
      <div className="mt-8 w-64 h-2 bg-rose-100 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full animate-pulse"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-rose-300 rounded-full opacity-60"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animation: `float ${3 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}
