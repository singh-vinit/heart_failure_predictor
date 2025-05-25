"use client";
import { Button } from "./ui/button";

interface Props {
  setFormData: (data: any) => void;
}

const fillSample = [{}];

export default function FillSampleData({ setFormData }: Props) {
  //Fill with sample data for demonstration
  const fillSampleData = () => {
    setFormData({
      subjectId: "SUBJ123",
      patientId: "PAT456",
      patientName: "Marry Johnson",
      patientAge: "45",
      patientGender: "Female",
      admitDate: "2025-04-01",
      dischargeDate: "2025-05-25",
      dischargeLocation: "HOSPICE-HOME",
      labTest: [
        { status: "abnormal", code: "40401" },
        { status: "abnormal", code: "40403" },
        { status: "abnormal", code: "40411" },
        { status: "abnormal", code: "40491" },
        { status: "abnormal", code: "40493" },
        { status: "abnormal", code: "42843" },
        { status: "abnormal", code: "42842" },
        { status: "abnormal", code: "42841" },
        { status: "abnormal", code: "42833" },
        { status: "abnormal", code: "42832" },
        { status: "abnormal", code: "42823" },
      ],
    });
  };
  return (
    <Button
      type="button"
      variant="secondary"
      className="mb-4 cursor-pointer border-rose-400 bg-rose-100 text-rose-600 hover:bg-rose-200 hover:text-rose-700 transition-colors"
      onClick={fillSampleData}
    >
      Fill Sample Data
    </Button>
  );
}
