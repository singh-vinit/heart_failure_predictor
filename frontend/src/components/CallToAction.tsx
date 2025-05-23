import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-rose-600 to-rose-800 text-white">
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Reduce Readmissions?</h2>
        <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
          Join healthcare providers nationwide who are using our predictive tool to improve outcomes for heart failure patients.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="bg-white text-rose-700 hover:bg-rose-50 cursor-pointer">
            Get Started Today
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent cursor-pointer">
            Request a Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;