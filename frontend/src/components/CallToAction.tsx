"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CallToAction = () => {
  const router = useRouter();
  return (
    <section className="relative py-16 mb-10 text-white">
      <div className="absolute top-0 h-full w-full lg:w-[60%] lg:left-[20%] md:rounded-b-full -z-10 bg-gradient-to-r from-rose-600 to-rose-800"></div>
      <div className="container px-4 mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Reduce Readmissions?</h2>
        <p className="text-xl text-rose-100 mb-8 max-w-xl mx-auto">
          Join healthcare providers nationwide who are using our predictive tool to improve outcomes for heart failure patients.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button onClick={() => router.push("/signup")} size="lg" className="bg-white text-rose-700 hover:bg-rose-50 cursor-pointer">
            Get Started Today
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;