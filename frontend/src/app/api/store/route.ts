import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("request body: ", body);
    const { patientId } = body;
    const { data } = await supabase
      .from("patientDetail")
      .select("id")
      .eq("patientId", patientId)
      .maybeSingle();
    if (data) {
      return NextResponse.json(
        { message: "A record with this patientId is already exists." },
        { status: 400 }
      );
    }
    const { error } = await supabase.from("patientDetail").insert(body);
    if (error) {
      console.log(error);
      return NextResponse.json({ message: "database error!" }, { status: 500 });
    } else {
      return NextResponse.json(
        { message: "successfully inserted" },
        { status: 200 }
      );
    }
  } catch (e) {
    console.log(e);
  }
}
