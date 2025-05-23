import { Hospital, ChartBar, LineChart } from "lucide-react";

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center text-rose-900 mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-rose-50 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Hospital className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Data Collection</h3>
            <p className="text-gray-600">
              The system collects relevant patient data including vital signs, lab results, medical history, and more.
            </p>
          </div>
          
          <div className="bg-rose-50 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ChartBar className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Risk Analysis</h3>
            <p className="text-gray-600">
              Our advanced algorithm analyzes patterns and identifies key risk factors that lead to readmission.
            </p>
          </div>
          
          <div className="bg-rose-50 rounded-lg p-6 text-center hover:shadow-md transition-all">
            <div className="bg-rose-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <LineChart className="h-8 w-8 text-rose-600" />
            </div>
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Actionable Insights</h3>
            <p className="text-gray-600">
              Healthcare teams receive clear recommendations for intervention to reduce readmission risk.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;