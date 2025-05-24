import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { HeartPulse } from "lucide-react";

const About = () => {
return (
<div className="min-h-screen bg-gradient-to-br from-pink-50 to-white">
  {/* Navigation */}
   <nav className="flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-sm border-b">
          <Link href="/" className="flex items-center ml-9">
            <HeartPulse className="h-8 w-8 text-rose-600 mr-2" />
            <span className="text-xl font-bold text-rose-900">HFRP</span>
          </Link>

  <div className="hidden md:flex items-center space-x-12">
    <Link href="#" className="text-xl text-pink-600 font-semibold">About</Link>
  </div>

  <div className="flex items-center space-x-4">
    <Button variant="outline" className="border-pink-500 text-pink-600 hover:text-white hover:bg-pink-500">Sign Up</Button>
    <Button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">Sign In</Button>
  </div>
  </nav>


      {/* Hero Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-600 to-red-600 bg-clip-text text-transparent mb-6">
            About Our Hospital Readmission Prediction Model
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Welcome to our awesome tool that's like a superpower for hospitals, helping predict if a patient might need to return within 30 days of leaving. It's all about keeping patients healthier and out of the hospital!
          </p>
        </div>

        {/* Content Sections */}
        <div className="grid gap-8 max-w-6xl mx-auto">
          {/* Mission Section */}
          <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">What's the Mission?</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We built this to spot patients who might be at risk of coming back to the hospital soon after discharge. By catching these risks early, doctors can provide extra care to keep patients on the road to recovery.
              </p>
            </CardContent>
          </Card>

          {/* How We Made It */}
          <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">How Did We Make It?</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We used a super-smart machine-learning tool called <span className="font-semibold text-pink-600">XGBoost</span>, which digs through patient data to find hidden patterns. To make it the best it could be, we used <span className="font-semibold text-pink-600">Optuna</span> to test 150 different setups, tweaking everything until we found the perfect formula—like tuning a guitar for the perfect sound!
              </p>
            </CardContent>
          </Card>

          {/* Data Section */}
          <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">What's in the Data?</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our model learned from a big dataset filled with details like where patients went after discharge, how long they stayed, their gender, lab test results, and how serious their condition was. We used 80% of the data to train the model and 20% to test it, making sure it handled the rare readmission cases with extra care.
              </p>
            </CardContent>
          </Card>

          {/* Fine-Tuning */}
          <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">Fine-Tuning for Success</h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                We played with settings like how deeply the model thinks, how fast it learns, and how much data it looks at each time. After 150 experiments, we locked in the best setup for top-notch predictions.
              </p>
            </CardContent>
          </Card>

          {/* Performance Section */}
          <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow bg-gradient-to-r from-pink-50 to-red-50">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-6">How Well Does It Work?</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                Our final model is a champ! Here's how it performed:
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-600 text-lg">Accuracy</h3>
                    <p className="text-gray-700">It nails predictions <span className="font-bold text-green-600">93.2%</span> of the time—super reliable!</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-600 text-lg">Precision</h3>
                    <p className="text-gray-700">When it flags a patient for readmission, it's right <span className="font-bold text-blue-600">51.97%</span> of the time.</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-600 text-lg">Recall</h3>
                    <p className="text-gray-700">It catches <span className="font-bold text-purple-600">62.2%</span> of the actual readmission cases.</p>
                  </div>
                  
                  <div className="bg-white p-4 rounded-lg border border-pink-200">
                    <h3 className="font-semibold text-pink-600 text-lg">F1-Score</h3>
                    <p className="text-gray-700">The overall score, balancing precision and recall, is a solid <span className="font-bold text-orange-600">0.5663</span>.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-white rounded-lg border border-pink-200">
                <h3 className="font-semibold text-pink-600 text-lg mb-2">Details</h3>
                <p className="text-gray-700 leading-relaxed">
                  For non-readmitted patients (class 0), it's nearly perfect with <span className="font-bold text-green-600">97% precision</span> and <span className="font-bold text-green-600">96% recall</span>. For readmitted patients (class 1), it's got <span className="font-bold text-blue-600">52% precision</span> and <span className="font-bold text-purple-600">62% recall</span>, handling a tough, smaller group of cases.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Why This Rocks */}
          <Card className="border-pink-100 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-pink-600 mb-4">Why This Rocks</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                This tool is a big deal for hospitals! It helps pinpoint patients who need a little extra TLC, which could mean fewer return visits and better health outcomes. It's not just tech—it's a way to make healthcare better and brighter!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white px-8 py-3">
                  Try The Predictor
                </Button>
                <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50 px-8 py-3">
                  View Project Details
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            Want the Full Scoop? Check out the code and details on our project page!
          </p>
          <Link href="/">
            <Button variant="outline" className="border-pink-200 text-pink-600 hover:bg-pink-50">
              ← Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;