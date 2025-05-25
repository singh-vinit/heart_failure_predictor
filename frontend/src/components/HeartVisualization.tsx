"use client";
import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface HeartVisualizationProps {
  riskPercentage: number;
  size?: number;
}

const HeartVisualization = ({ riskPercentage, size = 200 }: HeartVisualizationProps) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  console.log("Risk Percentage:", riskPercentage);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(riskPercentage*100);
    }, 500);
    return () => clearTimeout(timer);
  }, [riskPercentage]);

  const getColorFromPercentage = (percentage: number) => {
    if (percentage <= 25) return { bg: "from-green-200 to-green-400", border: "border-green-500" };
    if (percentage <= 50) return { bg: "from-yellow-200 to-yellow-400", border: "border-yellow-500" };
    if (percentage <= 75) return { bg: "from-orange-200 to-orange-400", border: "border-orange-500" };
    return { bg: "from-red-200 to-red-400", border: "border-red-500" };
  };

  const getRiskLevel = (percentage: number) => {
    if (percentage <= 25) return "Low Risk";
    if (percentage <= 50) return "Moderate Risk";
    if (percentage <= 75) return "High Risk";
    return "Critical Risk";
  };

  const colors = getColorFromPercentage(animatedPercentage);

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background heart */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Heart 
            className="text-gray-200 stroke-2" 
            size={size * 0.8}
            fill="currentColor"
          />
        </div>
        
        {/* Filled heart with gradient */}
        <div 
          className="absolute inset-0 flex items-center justify-center overflow-hidden transition-all duration-1000 ease-out"
          style={{ 
            clipPath: `inset(${100 - animatedPercentage}% 0 0 0)`,
          }}
        >
          <Heart 
            className={`bg-gradient-to-t ${colors.bg} bg-clip-text text-transparent stroke-2 ${colors.border}`}
            size={size * 0.8}
            fill="url(#heartGradient)"
          />
        </div>

        {/* SVG for gradient definition */}
        <svg className="absolute inset-0 w-0 h-0">
          <defs>
            <linearGradient id="heartGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor={animatedPercentage <= 25 ? "#4ade80" : animatedPercentage <= 50 ? "#facc15" : animatedPercentage <= 75 ? "#fb923c" : "#ef4444"} />
              <stop offset="100%" stopColor={animatedPercentage <= 25 ? "#22c55e" : animatedPercentage <= 50 ? "#eab308" : animatedPercentage <= 75 ? "#ea580c" : "#dc2626"} />
            </linearGradient>
          </defs>
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-700">
              {Math.round(animatedPercentage)}%
            </div>
          </div>
        </div>
      </div>

      {/* Risk level indicator */}
      <div className="text-center">
        <div className={`text-lg font-semibold ${
          animatedPercentage <= 25 ? "text-green-600" : 
          animatedPercentage <= 50 ? "text-yellow-600" : 
          animatedPercentage <= 75 ? "text-orange-600" : 
          "text-red-600"
        }`}>
          {getRiskLevel(animatedPercentage)}
        </div>
        <div className="text-sm text-gray-500">Cardiovascular Risk Assessment</div>
      </div>
    </div>
  );
};

export default HeartVisualization;
