import { NextResponse } from "next/server";
import { registerLeadFromUnknown } from "@/lib/leads/registerLead.server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    console.log("🚀 Raw Incoming Body:", JSON.stringify(body)); // לוג לבדיקה

    // הוספנו כאן את המיפוי של השדות החדשים
    const normalized = {
      fullName:
        body.fullName ??
        body.name ??
        body.firstName ??
        body["First Name"] ??
        "Friend",
      email: body.email ?? body.Email ?? "",
      phone: body.phone ?? body.tel ?? body.mobile ?? "",
      age: body.age ?? body.Age,
      state: body.state ?? body.region ?? "",
      website: body.website ?? "",
      
      // === הוספות חדשות ===
      country: body.country ?? "",
      source: body.source ?? "",
      // כאן אנחנו מוודאים שאנחנו תופסים את זה גם אם נשלח כ-personalMessage וגם כ-personal_message
      personal_message: body.personal_message ?? body.personalMessage ?? "" 
    };

    console.log("✅ Normalized Data to Save:", JSON.stringify(normalized));

    const result = await registerLeadFromUnknown(normalized);

    const status = result.ok
      ? 200
      : result.error === "validation"
      ? 400
      : result.error === "db"
      ? 500
      : 500;

    return NextResponse.json(result, { status });
  } catch (error: any) {
    console.error("🔥 Error:", error);
    return NextResponse.json({ ok: false, error: "unknown" }, { status: 500 });
  }
}