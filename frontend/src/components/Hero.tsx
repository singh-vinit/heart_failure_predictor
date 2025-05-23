import { Button } from "@/components/ui/button";
import { HeartPulse } from "lucide-react";

const Hero = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-rose-50 to-white">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-10 p-4">
            <h1 className="text-4xl md:text-5xl font-bold text-rose-900 mb-6">
              <span className="text-rose-600">Predict</span> and <span className="text-rose-600">Prevent</span> Heart Failure Readmissions
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              Our AI-powered tool helps healthcare providers identify patients at high risk for readmission, enabling timely interventions and improved outcomes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-rose-600 hover:bg-rose-700">
                Try The Predictor
              </Button>
              <Button size="lg" variant="outline" className="border-rose-600 text-rose-600 hover:bg-blue-50">
                Learn More
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12 lg:mt-0 flex justify-center">
            <div className="relative">
              {/* <div className="absolute -top-6 -left-6 w-24 h-24 bg-blue-100 rounded-full animate-pulse"></div>
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-200 rounded-full animate-pulse"></div> */}
              <div className="p-6 rounded-xl flex items-center justify-center">
                <div className="absolute h-56 w-56 rounded-full bg-rose-100 blur-sm animate-pulse"></div>
                <div className="absolute h-48 w-48 rounded-full bg-rose-200 blur-sm animate-pulse"></div>
                <div className="absolute h-36 w-36 rounded-full bg-rose-300 blur-sm animate-pulse"></div>
                <HeartPulse className="w-32 h-32 text-rose-600 relative" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;