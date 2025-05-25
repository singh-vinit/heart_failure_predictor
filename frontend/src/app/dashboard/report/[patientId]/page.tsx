import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, User, FileText, Activity } from "lucide-react";
import HeartVisualization from "@/components/HeartVisualization";
import { supabase } from "@/lib/supabaseClient";
import ReportAction from "@/components/ReportAction";

interface LabTest {
    code: string;
    status: "normal" | "abnormal";
}

interface Props {
  params: Promise<{ patientId: string }>;
}

export default async function Report({params}:Props) {
  const { patientId } = await params;
  const res = await supabase.from("patientDetail").select("*").eq("patientId", patientId).single();
  const patientData = res.data;     
  const labTests = res.data?.labTests ? JSON.parse(res.data.labTests) : [];
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "normal": return "default";
      case "abnormal": return "destructive";
    }
  };

  if (!patientData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center mb-6">
          {/* <Button 
            variant="ghost" 
            className="mr-4 text-rose-600 hover:bg-rose-100"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button> */}
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-rose-500 mr-3" />
            <h1 className="text-3xl font-bold text-rose-700">Patient Report</h1>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Heart Visualization */}
          <div className="lg:col-span-1">
            <Card className="border-rose-200 text-center">
              <CardHeader>
                <CardTitle className="text-rose-700">Risk Assessment</CardTitle>
                <CardDescription>Cardiovascular Risk Prediction</CardDescription>
              </CardHeader>
              <CardContent>
                <HeartVisualization riskPercentage={patientData.probability} size={250} />
              </CardContent>
            </Card>
          </div>

          {/* Patient Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Details */}
            <Card className="border-rose-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-rose-500" />
                  <CardTitle className="text-rose-700">Patient Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Patient Name</label>
                    <p className="text-lg font-semibold text-gray-900">{patientData.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Age</label>
                    <p className="text-lg font-semibold text-gray-900">{patientData.age} years</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Gender</label>
                    <p className="text-lg font-semibold text-gray-900 capitalize">{patientData.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Patient ID</label>
                    <p className="text-lg font-semibold text-gray-900">{patientData.patientId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Admission Details */}
            <Card className="border-rose-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-6 h-6 text-rose-500" />
                  <CardTitle className="text-rose-700">Admission Details</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Admit Date</label>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(patientData.admitDate)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Discharge Date</label>
                    <p className="text-lg font-semibold text-gray-900">{formatDate(patientData.dischargeDate)}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-gray-500">Discharge Location</label>
                    <div className="flex items-center space-x-2 mt-1">
                      <MapPin className="w-4 h-4 text-rose-500" />
                      <p className="text-lg font-semibold text-gray-900 capitalize">{patientData.dischargeLocation}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lab Tests */}
            <Card className="border-rose-200">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <Activity className="w-6 h-6 text-rose-500" />
                  <CardTitle className="text-rose-700">Lab Test Results</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {labTests.map((test: LabTest, index: number) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-rose-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{test.code}</p>
                        <p className="text-sm text-gray-500">Test Code</p>
                      </div>
                      <Badge variant={getStatusBadgeVariant(test.status)} className="capitalize">
                        {test.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex justify-center space-x-4">
              <ReportAction />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

