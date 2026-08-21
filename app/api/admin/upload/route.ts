import {getVisitPngUser} from "../../../auth";
import {requireAdministrator} from "../../../../db/admin";
import {writeFile, mkdir} from "node:fs/promises";
import {join} from "node:path";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const identity = await getVisitPngUser();
    if (!identity) {
      return Response.json({ success: false, error: "Please sign in." }, { status: 401 });
    }
    await requireAdministrator(identity);

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return Response.json({ success: false, error: "No image file provided." }, { status: 400 });
    }

    // Validate mime type
    const validMimes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/avif", "image/svg+xml"];
    if (!validMimes.includes(file.type)) {
      return Response.json({ success: false, error: "Invalid file type. Allowed formats: JPG, PNG, WEBP, GIF, AVIF, SVG." }, { status: 400 });
    }

    // Limit to 15MB
    if (file.size > 15 * 1024 * 1024) {
      return Response.json({ success: false, error: "File too large. Maximum allowed size is 15MB." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = join(process.cwd(), "public", "uploads");
    await mkdir(uploadsDir, { recursive: true });

    // Safe sanitized filename with timestamp
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const safeBase = file.name.replace(/\.[^/.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "_").toLowerCase().slice(0, 40);
    const filename = `${Date.now()}_${safeBase}.${ext}`;
    const filePath = join(uploadsDir, filename);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${filename}`;
    return Response.json({
      success: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimeType: file.type
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Image upload failed.";
    return Response.json({ success: false, error: msg }, { status: 400 });
  }
}
