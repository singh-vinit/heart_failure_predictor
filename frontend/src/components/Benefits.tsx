import { Calendar, ChartBar, HeartPulse } from "lucide-react";

const Benefits = () => {
  return (
    <section className="py-16 bg-rose-50">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center text-rose-900 mb-4">Benefits</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Our heart failure readmission predictor provides significant advantages for healthcare providers and patients alike.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <HeartPulse className="h-10 w-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Improved Patient Outcomes</h3>
            <p className="text-gray-600">
              Early intervention leads to better recovery trajectories and quality of life for patients with heart failure.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Calendar className="h-10 w-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Reduced Readmission Rates</h3>
            <p className="text-gray-600">
              Hospitals using our tool have seen up to 30% reduction in 30-day readmission rates for heart failure patients.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ChartBar className="h-10 w-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Cost Savings</h3>
            <p className="text-gray-600">
              Lower readmission rates translate to significant cost savings for healthcare systems and payers.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <Calendar className="h-10 w-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Resource Optimization</h3>
            <p className="text-gray-600">
              Focus resources on high-risk patients who need them most, optimizing staff time and hospital capacity.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <ChartBar className="h-10 w-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Data-Driven Decisions</h3>
            <p className="text-gray-600">
              Make treatment decisions backed by comprehensive data analysis and predictive insights.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <HeartPulse className="h-10 w-10 text-rose-600 mb-4" />
            <h3 className="text-xl font-semibold text-rose-800 mb-3">Regulatory Compliance</h3>
            <p className="text-gray-600">
              Help meet quality metrics and avoid penalties related to excess readmissions under CMS guidelines.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
