/**
 * POST /api/submit-tutor
 *
 * Receives multipart/form-data from TutorRegistrationForm.tsx
 *
 * Flow:
 *   1. Parse & validate FormData
 *   2. Upload ID proof → Cloudinary → get secure URL
 *   3. Append row → Google Sheets (with Cloudinary link)
 *   4. Send email notification → client via Resend
 *   5. Return { success: true } or { success: false, message }
 * File location: src/app/api/submit-tutor/route.ts
 */

import { NextRequest, NextResponse } from "next/server";
import { appendTutorRow, uploadIdProof, buildPublicId, type TutorRowData } from "@/lib/googleClient";
import { sendTutorRegistrationEmail, type TutorEmailData } from "@/lib/mailer";

// ─── Route config ─────────────────────────────────────────────────────────────

export const runtime    = "nodejs"; // required — googleapis + cloudinary need Node
export const maxDuration = 60;       // Cloudinary upload can take a few seconds

// ─── Constants ────────────────────────────────────────────────────────────────

const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "application/pdf",
]);

const MAX_FILE_BYTES = 5 * 1024 * 1024; // 5 MB

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Safely extract a trimmed string field from FormData */
function f(fd: FormData, key: string): string {
  const val = fd.get(key);
  return typeof val === "string" ? val.trim() : "";
}

function err(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

// ─── Server-side validation ───────────────────────────────────────────────────

function validate(fd: FormData, file: File | null): string | null {
  const phone10 = /^[6-9]\d{9}$/;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!f(fd, "fullName") || f(fd, "fullName").length < 2)
    return "Full name is required";
  if (!f(fd, "gender"))
    return "Gender is required";
  if (!phone10.test(f(fd, "phone").replace(/\s/g, "")))
    return "A valid 10-digit Indian mobile number is required";
  if (f(fd, "alternatePhone") && !phone10.test(f(fd, "alternatePhone").replace(/\s/g, "")))
    return "Alternate phone must be a valid 10-digit number";
  if (!emailRx.test(f(fd, "email")))
    return "A valid email address is required";
  if (f(fd, "correspondenceAddress").length < 10)
    return "Please enter a complete correspondence address";
  if (f(fd, "permanentAddress").length < 10)
    return "Please enter a complete permanent address";
  if (!f(fd, "city"))
    return "City is required";
  if (!f(fd, "experience"))
    return "Teaching experience is required";
  if (!f(fd, "subjects"))
    return "At least one subject is required";
  if (!f(fd, "fromClass") || !f(fd, "toClass"))
    return "Class range is required";
  if (!f(fd, "preferredLocations"))
    return "At least one preferred location is required";
  if (!f(fd, "hasVehicle"))
    return "Please select whether you own a vehicle";
  if (!f(fd, "qualification"))
    return "Qualification is required";
  if (!f(fd, "idProofType"))
    return "Please select your ID proof type";
  if (!file)
    return "ID proof document is required";
  if (!ALLOWED_MIME_TYPES.has(file.type))
    return "ID proof must be a JPG, PNG, or PDF file";
  if (file.size > MAX_FILE_BYTES)
    return "ID proof file must be under 5 MB";

  return null; // all good
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {

  // ── 1. Parse FormData ──────────────────────────────────────────────────────
  let fd: FormData;
  try {
    fd = await request.formData();
  } catch {
    return err("Could not parse form submission. Please try again.");
  }

  const rawFile    = fd.get("idProofFile");
  const idProofFile = rawFile instanceof File ? rawFile : null;

  // ── 2. Validate ────────────────────────────────────────────────────────────
  const validationError = validate(fd, idProofFile);
  if (validationError) return err(validationError, 422);

  // TypeScript: guaranteed non-null after validation
  const file = idProofFile as File;

  // ── 3. Upload ID proof → Cloudinary ───────────────────────────────────────
  let idProofUrl = "";
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer      = Buffer.from(arrayBuffer);
    const publicId    = buildPublicId(f(fd, "fullName"));
    idProofUrl        = await uploadIdProof(buffer, file.type, publicId);
  } catch (uploadError) {
    // Non-fatal — we log it and continue. The sheet row will show "Not Uploaded"
    // and the email will reflect this. Client can follow up with the tutor.
    console.error("[submit-tutor] Cloudinary upload failed:", uploadError);
  }

  // ── 4. Build row data ──────────────────────────────────────────────────────
  const entryDate = new Date().toLocaleString("en-IN", {
    timeZone:  "Asia/Kolkata",
    day:       "2-digit",
    month:     "2-digit",
    year:      "numeric",
    hour:      "2-digit",
    minute:    "2-digit",
    hour12:    true,
  });

  const rowData: TutorRowData = {
    entryDate,
    fullName:              f(fd, "fullName"),
    gender:                f(fd, "gender"),
    phone:                 f(fd, "phone"),
    alternatePhone:        f(fd, "alternatePhone"),
    email:                 f(fd, "email"),
    correspondenceAddress: f(fd, "correspondenceAddress"),
    permanentAddress:      f(fd, "permanentAddress"),
    city:                  f(fd, "city"),
    delhiArea:             f(fd, "delhiArea"),
    otherCity:             f(fd, "otherCity"),
    experience:            f(fd, "experience"),
    subjects:              f(fd, "subjects"),
    fromClass:             f(fd, "fromClass"),
    toClass:               f(fd, "toClass"),
    preferredLocations:    f(fd, "preferredLocations"),
    hasVehicle:            f(fd, "hasVehicle"),
    qualification:         f(fd, "qualification"),
    idProofType:           f(fd, "idProofType"),
    idProofLink:           idProofUrl,
  };

  // ── 5. Append → Google Sheets ──────────────────────────────────────────────
  try {
    await appendTutorRow(rowData);
  } catch (sheetsError) {
    console.error("[submit-tutor] Sheets append failed:", sheetsError);
    // Fatal — tutor must know their registration wasn't recorded
    return NextResponse.json(
      {
        success: false,
        message:
          "Registration could not be saved. Please contact us on WhatsApp: +91 8076661356",
      },
      { status: 500 }
    );
  }

  // ── 6. Send email notification → Resend ───────────────────────────────────
  try {
    const emailData: TutorEmailData = {
      entryDate,
      fullName:           rowData.fullName,
      gender:             rowData.gender,
      phone:              rowData.phone,
      alternatePhone:     rowData.alternatePhone,
      email:              rowData.email,
      city:               rowData.city,
      experience:         rowData.experience,
      subjects:           rowData.subjects,
      fromClass:          rowData.fromClass,
      toClass:            rowData.toClass,
      preferredLocations: rowData.preferredLocations,
      qualification:      rowData.qualification,
      hasVehicle:         rowData.hasVehicle,
      idProofType:        rowData.idProofType,
      idProofUrl:         idProofUrl,
    };
    await sendTutorRegistrationEmail(emailData);
  } catch (emailError) {
    // Non-fatal — data is already in the sheet. Log and continue.
    console.error("[submit-tutor] Resend email failed:", emailError);
  }

  // ── 7. Success ─────────────────────────────────────────────────────────────
  console.info(
    `[submit-tutor] ✅ ${rowData.fullName} | ${rowData.phone} | ${rowData.city}`
  );

  return NextResponse.json({ success: true }, { status: 200 });
}

// Wrong method guard
export async function GET() {
  return NextResponse.json(
    { success: false, message: "Method not allowed" },
    { status: 405 }
  );
}