import { getVisitPngUser } from "../../../auth";
import { getAdminProviderApplications, updateAdminProviderApplication } from "../../../../db/providers";

function reply(error: unknown) {
  if (error instanceof Error && error.message === "ADMIN_REQUIRED") {
    return Response.json({ error: "Administrator access is required." }, { status: 403 });
  }
  return Response.json({ error: error instanceof Error ? error.message : "The operation failed." }, { status: 400 });
}

export async function GET() {
  const identity = await getVisitPngUser();
  if (!identity) {
    return Response.json({ error: "Please sign in." }, { status: 401 });
  }

  try {
    const data = await getAdminProviderApplications(identity);
    return Response.json(data);
  } catch (err: unknown) {
    return reply(err);
  }
}

export async function POST(request: Request) {
  const identity = await getVisitPngUser();
  if (!identity) {
    return Response.json({ error: "Please sign in." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const result = await updateAdminProviderApplication(identity, body);
    return Response.json(result);
  } catch (err: unknown) {
    return reply(err);
  }
}
