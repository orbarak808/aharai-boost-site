import { NextResponse } from "next/server";
import { registerLeadFromUnknown } from "@/lib/leads/registerLead.server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const result = await registerLeadFromUnknown(body);

    if (!result.ok) {
      if (result.error === "validation") {
        return NextResponse.json(result, { status: 400 });
      }
      if (result.error === "db") {
        return NextResponse.json(result, { status: 500 });
      }
      return NextResponse.json(result, { status: 500 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "unknown" }, { status: 500 });
  }
}
