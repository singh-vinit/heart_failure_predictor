import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Activity, AlertCircle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import FillSampleData from "./FillSampleData"; // Import the sample data component

interface Props {
  userId: string;
}

const dischargeLocations = [
  "SNF",
  "HOME",
  "REHAB/DISTINCT PART HOSP",
  "LONG TERM CARE HOSPITAL",
  "SHORT TERM HOSPITAL",
  "LEFT AGAINST MEDICAL ADVI",
  "HOSPICE-HOME",
  "DISC-TRAN CANCER/CHLDRN H",
  "OTHER FACILITY",
];

export default function MedicalForm({ userId }: Props) {
  const [formData, setFormData] = useState({
    subjectId: "",
    patientId: "",
    patientName: "",
    patientAge: "",
    patientGender: "",
    admitDate: "",
    dischargeDate: "",
    dischargeLocation: "",
    labTest: [
      { code: "", status: "" }, // at least one by default
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLabTestChange = (index: number, field: string, value: string) => {
    const updatedTests = [...formData.labTest];
    updatedTests[index] = { ...updatedTests[index], [field]: value };
    setFormData((prev) => ({
      ...prev,
      labTest: updatedTests,
    }));
  };

  const addLabTest = () => {
    setFormData((prev) => ({
      ...prev,
      labTest: [...prev.labTest, { code: "", status: "" }],
    }));
  };
  const removeLabTest = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      labTest: prev.labTest.filter((_, i) => i !== index),
    }));
  };

  const [databaseLoading, setDatabaseLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setDatabaseLoading(true);
    // api call to store patient data in the database
    const res = await fetch("/api/store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        name: formData.patientName,
        age: formData.patientAge,
        gender: formData.patientGender == "M" ? "MALE" : "FEMALE",
        admitDate: formData.admitDate,
        dischargeDate: formData.dischargeDate,
        dischargeLocation:
          dischargeLocations[Number(formData.dischargeLocation)],
      }),
    });
    console.log(res);

    //api call to prcess the data with the ML model
    const tests = [] as [string, string][];
    formData.labTest.map((test) => tests.push([test.status, test.code]));
    const predictionRes = await fetch("https://heart-failure-predictor-z0j1.onrender.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        features: [
          formData.dischargeLocation,
          formData.admitDate,
          formData.dischargeDate,
          formData.patientGender,
          tests,
        ],
      }),
    });
    console.log(predictionRes);

    setDatabaseLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl mx-auto"
    >
      <FillSampleData setFormData={setFormData} />

      {/* Main Form */}
      <motion.div variants={itemVariants}>
        <Card className="border-rose-200 bg-white/80 backdrop-blur-sm shadow-xl p-0">
          <CardHeader className="bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-t-lg py-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Heart className="h-6 w-6" />
              Medical Information Form
            </CardTitle>
            <CardDescription className="text-rose-100 text-sm">
              Please provide accurate information for the most reliable
              assessment
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="subjectId"
                    className="flex items-center gap-2 font-medium"
                  >
                    Subject ID
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="subjectId"
                    type="text"
                    placeholder="Enter subject ID"
                    value={formData.subjectId || ""}
                    onChange={(e) =>
                      handleInputChange("subjectId", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    Unique identifier for the patient
                  </p>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="patientId"
                    className="flex items-center gap-2 font-medium"
                  >
                    Patient Id
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="patientId"
                    type="text"
                    placeholder="Enter patient ID"
                    value={formData.patientId || ""}
                    onChange={(e) =>
                      handleInputChange("patientId", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    Unique identifier for the patient
                  </p>
                </motion.div>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="patientName"
                    className="flex items-center gap-2 font-medium"
                  >
                    Patient Name
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="patientName"
                    type="text"
                    placeholder="Enter patient name"
                    value={formData.patientName}
                    onChange={(e) =>
                      handleInputChange("patientName", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    Full name of the patient for identification
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="patientAge"
                    className="flex items-center gap-2 font-medium"
                  >
                    Age (years)
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="patientAge"
                    type="number"
                    placeholder="Enter patient age"
                    value={formData.patientAge || ""}
                    onChange={(e) =>
                      handleInputChange("patientAge", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                    required
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    Age is a significant risk factor for cardiovascular disease
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="patientGender"
                    className="flex items-center gap-2 font-medium"
                  >
                    Gender
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Select
                    value={formData.patientGender || ""}
                    onValueChange={(value) =>
                      handleInputChange("patientGender", value)
                    }
                  >
                    <SelectTrigger className="border-rose-200 focus:border-rose-400">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    Gender affects cardiovascular risk patterns
                  </p>
                </motion.div>
              </div>

              {/* Vital Signs */}
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="admitDate"
                    className="flex items-center gap-2 font-medium"
                  >
                    Admit Date
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="admitDate"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={formData.admitDate || ""}
                    onChange={(e) =>
                      handleInputChange("admitDate", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    enter the date of hospital admission
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="dischargeDate"
                    className="flex items-center gap-2 font-medium"
                  >
                    Discharge Date
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Input
                    id="dischargeDate"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    value={formData.dischargeDate || ""}
                    onChange={(e) =>
                      handleInputChange("dischargeDate", e.target.value)
                    }
                    className="border-rose-200 focus:border-rose-400"
                  />
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    enter the date of hospital discharge
                  </p>
                </motion.div>
              </div>

              {/* Advanced Metrics */}
              <div className="">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label
                    htmlFor="dischargeLocation"
                    className="flex items-center gap-2 font-medium"
                  >
                    Discharge Location
                    <Badge variant="outline" className="text-xs">
                      Required
                    </Badge>
                  </Label>
                  <Select
                    value={formData.dischargeLocation || ""}
                    onValueChange={(value) =>
                      handleInputChange("dischargeLocation", value)
                    }
                  >
                    <SelectTrigger className="border-rose-200 focus:border-rose-400 w-full">
                      <SelectValue placeholder="Select the relevant discharge location" />
                    </SelectTrigger>
                    <SelectContent className="capitalize">
                      <SelectItem value="1">SNF</SelectItem>
                      <SelectItem value="2">HOME</SelectItem>
                      <SelectItem value="3">
                        REHAB/DISTINCT PART HOSP
                      </SelectItem>
                      <SelectItem value="4">LONG TERM CARE HOSPITAL</SelectItem>
                      <SelectItem value="5">SHORT TERM HOSPITAL</SelectItem>
                      <SelectItem value="6">
                        LEFT AGAINST MEDICAL ADVI
                      </SelectItem>
                      <SelectItem value="7">HOSPICE-HOME</SelectItem>
                      <SelectItem value="8">
                        DISC-TRAN CANCER/CHLDRN H
                      </SelectItem>
                      <SelectItem value="9">OTHER FACILITY</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 flex items-start gap-1">
                    <Info className="h-3 w-3 mt-0.5 text-rose-400" />
                    enter the location where the patient was discharged
                  </p>
                </motion.div>
              </div>
              {/* Lab Tests */}
              <div className="space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label className="font-medium">
                    Lab Tests
                    <Badge variant="outline" className="text-xs">
                      At least one required
                    </Badge>
                  </Label>
                  {formData.labTest.map((test, index) => (
                    <div key={index} className="grid md:grid-cols-2 gap-4">
                      <Input
                        type="text"
                        placeholder="Test Code"
                        value={test.code}
                        onChange={(e) =>
                          handleLabTestChange(index, "code", e.target.value)
                        }
                        className="border-rose-200 focus:border-rose-400"
                      />
                      <Select
                        value={test.status || ""}
                        onValueChange={(value) =>
                          handleLabTestChange(index, "status", value)
                        }
                      >
                        <SelectTrigger className="border-rose-200 focus:border-rose-400">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="abnormal">Abnormal</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addLabTest}
                      className="text-rose-500 hover:text-rose-600"
                    >
                      Add Lab Test
                    </Button>
                    {formData.labTest.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          removeLabTest(formData.labTest.length - 1)
                        }
                        className="text-rose-500 hover:text-rose-600"
                      >
                        Remove Last Test
                      </Button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Warning Message */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-rose-50 border border-rose-200 rounded-lg p-4"
              >
                <div className="flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 text-rose-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-rose-800 mb-1">
                      Medical Disclaimer
                    </h4>
                    <p className="text-sm text-rose-700">
                      This tool provides risk assessment based on statistical
                      models and should not replace professional medical advice.
                      Always consult with healthcare professionals for medical
                      decisions.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="pt-4"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-rose-500 to-red-500 hover:from-rose-600 hover:to-red-600 text-white font-medium py-3 text-lg"
                >
                  {isSubmitting ? (
                    <motion.div className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Analyzing...
                    </motion.div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Analyze Heart Health Risk
                    </div>
                  )}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
