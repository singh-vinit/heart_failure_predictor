"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ReportAction() {
  const router = useRouter();
  const handleCreateReport = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <Button
        className="bg-rose-500 hover:bg-rose-600 text-white cursor-pointer"
        onClick={handleCreateReport}
      >
        Create New Report
      </Button>
      <Button
        variant="outline"
        onClick={() => window.print()}
        className="border-rose-300 text-rose-600 hover:bg-rose-50 cursor-pointer"
      >
        Print Report
      </Button>
    </>
  );
}
