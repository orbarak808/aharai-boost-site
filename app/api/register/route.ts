import { NextResponse } from "next/server";
import { registerLeadFromUnknown } from "@/lib/leads/registerLead.server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Backwards-compatible field mapping (in case other integrations post different keys)
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
      website: body.website ?? ""
    };

    console.log("🚀 Incoming Data:", JSON.stringify(normalized));

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
