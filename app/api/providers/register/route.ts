import { NextResponse } from "next/server";
import { submitProviderRegistration, getProviderApplicationStatus } from "../../../../db/providers";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = await submitProviderRegistration(body);
    return NextResponse.json(result);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Registration could not be processed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ error: "Provide application reference or email" }, { status: 400 });
  }

  try {
    const status = await getProviderApplicationStatus(q);
    if (!status) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }
    return NextResponse.json(status);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Could not retrieve application";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
