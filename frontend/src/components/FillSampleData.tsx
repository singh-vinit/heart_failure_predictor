"use client";
import { Button } from "./ui/button";

interface Props {
    setFormData: (data: any) => void;
}

export default function FillSampleData({setFormData}: Props) {
    //Fill with sample data for demonstration
      const fillSampleData = () => {
        setFormData({
          subjectId: "SUBJ123",
          patientId: "PAT456",
          patientName: "John Doe",
          patientAge: "65",
          patientGender: "M",
          admitDate: "2024-05-01",
          dischargeDate: "2024-05-10",
          dischargeLocation: "2",
          labTest: [
            { code: "40491", status: "normal" },
            { code: "40413", status: "Abnormal" },
          ],
        });
      };
    return <Button
        type="button"
        variant="secondary"
        className="mb-4 cursor-pointer border-rose-400 bg-rose-100 text-rose-600 hover:bg-rose-200 hover:text-rose-700 transition-colors"
        onClick={fillSampleData}
      >
        Fill Sample Data
      </Button>
}