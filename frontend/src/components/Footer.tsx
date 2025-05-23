import { HeartPulse } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-rose-600 text-rose-100 py-12">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center">
              <HeartPulse className="h-6 w-6 mr-2 text-blue-300" />
              <span className="text-xl font-bold text-white">Heart Failure Readmission Predictor</span>
            </div>
            <p className="mt-4 max-w-md text-blue-200">
              Advanced analytics to predict and prevent heart failure readmissions, improving patient outcomes and reducing healthcare costs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4 text-white">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">HIPAA Compliance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-rose-800 mt-12 pt-8 text-sm text-blue-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Heart Failure Readmission Predictor. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <a href="#" className="mx-2 hover:text-white transition-colors">Privacy</a>
              <a href="#" className="mx-2 hover:text-white transition-colors">Terms</a>
              <a href="#" className="mx-2 hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
