
import { ChartLine, CalendarCheck, Hospital } from "lucide-react";

const Features = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">Key Features</h2>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-8">
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <ChartLine className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Predictive Analytics Dashboard</h3>
                  <p className="text-gray-600">
                    Intuitive visualization of patient risk factors and readmission probability with easy-to-interpret graphics.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <CalendarCheck className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Automated Follow-up Scheduling</h3>
                  <p className="text-gray-600">
                    System suggests optimal follow-up timing based on individual patient risk profiles.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-4">
                  <Hospital className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-800 mb-2">Care Plan Generator</h3>
                  <p className="text-gray-600">
                    Automatically generates personalized care plans tailored to each patient's specific risk factors.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-xl shadow-inner">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h4 className="font-semibold text-blue-800 mb-3">Patient Risk Assessment</h4>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Readmission Risk</span>
                    <span className="text-sm font-medium text-red-600">High (78%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-red-600 h-2 rounded-full" style={{ width: "78%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Medication Adherence</span>
                    <span className="text-sm font-medium text-amber-600">Medium (45%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-amber-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600">Follow-up Attendance</span>
                    <span className="text-sm font-medium text-green-600">Good (85%)</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <h5 className="text-sm font-medium text-gray-900 mb-2">Recommended Interventions:</h5>
                  <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                    <li>Weekly nurse call check-in</li>
                    <li>Medication review appointment</li>
                    <li>Dietary consultation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
