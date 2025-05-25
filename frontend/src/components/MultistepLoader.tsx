"use client";
import { useState, useEffect } from "react";
import { Check, Database, Brain, Download, Flower2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const steps = [
  {
    id: 1,
    title: "Storing Data",
    description: "Saving your data securely in the database",
    icon: Database,
    duration: 2000,
  },
  {
    id: 2,
    title: "Processing Model",
    description: "Making API call to ML model for analysis",
    icon: Brain,
    duration: 2000,
  },
  {
    id: 3,
    title: "Fetching Results",
    description: "Retrieving ML model prediction response",
    icon: Download,
    duration: 2000,
  },
];

export default function MultistepLoader({patientId}: { patientId: string }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  const router = useRouter();
  const handleReport = () => {
    router.push(`/dashboard/report/${patientId}`);
  };

  useEffect(() => {
    if (!isLoading) return;

    if (currentStep < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStep((prev) => prev + 1);
      }, steps[currentStep]?.duration || 2000);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
      setIsLoading(false);
    }
  }, [currentStep, isLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm border-rose-200 shadow-xl">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <Flower2 className="w-12 h-12 text-rose-500 mx-auto mb-4" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-rose-400 rounded-full animate-pulse" />
            </div>
            <h2 className="text-2xl font-bold text-rose-900 mb-2">
              ML Model Processing
            </h2>
            <p className="text-rose-600">Processing your request with care</p>
          </div>


          {(isLoading || isComplete) && (
            <div className="space-y-6">
              {steps.map((step, index) => {
                const isActive = index === currentStep && isLoading;
                const isCompleted = index < currentStep || isComplete;
                const isPending = index > currentStep && !isComplete;
                const Icon = step.icon;

                return (
                  <div key={step.id} className="flex items-center space-x-4">
                    <div
                      className={`
                      relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-500
                      ${
                        isCompleted
                          ? "bg-gradient-to-r from-rose-500 to-pink-500 border-rose-500 text-white"
                          : isActive
                          ? "bg-rose-100 border-rose-400 text-rose-600 animate-pulse"
                          : "bg-gray-100 border-gray-300 text-gray-400"
                      }
                    `}
                    >
                      {isCompleted ? (
                        <Check className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}

                      {isActive && (
                        <div className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3
                        className={`
                        font-semibold transition-colors duration-300
                        ${
                          isCompleted
                            ? "text-rose-700"
                            : isActive
                            ? "text-rose-600"
                            : "text-gray-500"
                        }
                      `}
                      >
                        {step.title}
                      </h3>
                      <p
                        className={`
                        text-sm transition-colors duration-300
                        ${
                          isCompleted
                            ? "text-rose-600"
                            : isActive
                            ? "text-rose-500"
                            : "text-gray-400"
                        }
                      `}
                      >
                        {step.description}
                      </p>
                    </div>

                    {isActive && (
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Progress Bar */}
              <div className="mt-8">
                <div className="flex justify-between text-sm text-rose-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round((currentStep / steps.length) * 100)}%</span>
                </div>
                <div className="w-full bg-rose-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${(currentStep / steps.length) * 100}%` }}
                  />
                </div>
              </div>

              {isComplete && (
                <div className="text-center mt-6 space-y-4">
                  <div className="p-4 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg border border-rose-200">
                    <h3 className="text-lg font-semibold text-rose-800 mb-2">
                      Processing Complete! 🌹
                    </h3>
                    <p className="text-rose-600">
                      Your ML model has successfully processed the data and
                      predictions are ready.
                    </p>
                  </div>
                  <Button
                    onClick={handleReport}
                    variant="outline"
                    className="border-rose-300 text-rose-600 hover:bg-rose-50"
                  >
                    Go to Report
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Decorative Elements */}
          <div className="absolute top-4 right-4 w-8 h-8 bg-rose-200 rounded-full opacity-20 animate-pulse" />
          <div
            className="absolute bottom-4 left-4 w-6 h-6 bg-pink-200 rounded-full opacity-30 animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
