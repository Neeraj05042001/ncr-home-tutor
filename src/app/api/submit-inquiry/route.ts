/**
 * POST /api/submit-inquiry
 *
 * Receives JSON from InquiryForm.tsx
 *
 * Flow:
 *   1. Parse & validate JSON body
 *   2. Append row → Google Sheets "Inquiries" tab
 *   3. Send email notification → client via Resend
 *   4. Return { success: true } or { success: false, message }
 *
 * File location: src/app/api/submit-inquiry/route.ts
 */

import { NextRequest, NextResponse } from "next/server";
import { google }                    from "googleapis";
import { sendInquiryEmail }          from "@/lib/mailer";

// ─── Route config ─────────────────────────────────────────────────────────────

export const runtime     = "nodejs";
export const maxDuration = 30;

// ─── Google auth ──────────────────────────────────────────────────────────────

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key:  process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface InquiryPayload {
  userType:             string;
  parentName:           string;
  studentName:          string;
  phone:                string;
  whatsappNumber:       string;
  email:                string;
  studentClass:         string;
  board:                string;
  subjects:             string;
  examPrep:             string;
  tuitionMode:          string;
  sessionsPerWeek:      string;
  preferredTimings:     string;
  startWhen:            string;
  city:                 string;
  area:                 string;
  otherCity:            string;
  tutorGender:          string;
  budget:               string;
  specificRequirements: string;
  referralSource:       string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(body: Partial<InquiryPayload>): string | null {
  const phone10 = /^[6-9]\d{9}$/;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!body.parentName?.trim() || body.parentName.trim().length < 2)
    return "Name is required";
  if (!phone10.test((body.phone ?? "").replace(/\s/g, "")))
    return "A valid 10-digit phone number is required";
  if (body.email && !emailRx.test(body.email))
    return "Invalid email address";
  if (!body.studentClass)
    return "Student class is required";
  if (!body.board)
    return "Board is required";
  if (!body.subjects?.trim())
    return "At least one subject is required";
  if (!body.tuitionMode)
    return "Tuition mode is required";
  if (!body.sessionsPerWeek)
    return "Sessions per week is required";
  if (!body.preferredTimings?.trim())
    return "Preferred timing is required";
  if (!body.startWhen)
    return "Start date is required";
  if (!body.city)
    return "City is required";
  if (!body.tutorGender)
    return "Tutor gender preference is required";

  return null;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function s(val: unknown): string {
  return typeof val === "string" ? val.trim() : "";
}

function errRes(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {

  // ── 1. Parse body ──────────────────────────────────────────────────────────
  let body: Partial<InquiryPayload>;
  try {
    body = await request.json() as Partial<InquiryPayload>;
  } catch {
    return errRes("Invalid request body");
  }

  // ── 2. Validate ────────────────────────────────────────────────────────────
  const validationError = validate(body);
  if (validationError) return errRes(validationError, 422);

  // ── 3. Build entry date ────────────────────────────────────────────────────
  const entryDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day:      "2-digit",
    month:    "2-digit",
    year:     "numeric",
    hour:     "2-digit",
    minute:   "2-digit",
    hour12:   true,
  });

  // ── 4. Append to Google Sheets "Inquiries" tab ────────────────────────────
  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() });

    // Columns A → V (22 columns)
    const row = [
      entryDate,                      // A — Entry Date
      s(body.userType),               // B — User Type
      s(body.parentName),             // C — Parent / Enquirer Name
      s(body.studentName),            // D — Student Name
      s(body.phone),                  // E — Phone
      s(body.whatsappNumber),         // F — WhatsApp
      s(body.email),                  // G — Email
      s(body.studentClass),           // H — Class
      s(body.board),                  // I — Board
      s(body.subjects),               // J — Subjects
      s(body.examPrep),               // K — Exam Prep
      s(body.tuitionMode),            // L — Mode
      s(body.sessionsPerWeek),        // M — Sessions/Week
      s(body.preferredTimings),       // N — Timings
      s(body.startWhen),              // O — Start When
      s(body.city),                   // P — City
      s(body.area) || s(body.otherCity), // Q — Area
      s(body.tutorGender),            // R — Tutor Gender Pref
      s(body.budget),                 // S — Budget
      s(body.specificRequirements),   // T — Specific Requirements
      s(body.referralSource),         // U — Referral Source
      "New",                          // V — Status (for client to update)
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId:    process.env.GOOGLE_SHEET_ID!,
      range:            "Inquiries!A:V",
      valueInputOption: "USER_ENTERED",
      requestBody:      { values: [row] },
    });
  } catch (sheetsError) {
    console.error("[submit-inquiry] Sheets failed:", sheetsError);
    return NextResponse.json(
      {
        success: false,
        message: "Could not save your enquiry. Please call us on +91 8076661356",
      },
      { status: 500 }
    );
  }

  // ── 5. Send email notification ─────────────────────────────────────────────
  try {
    await sendInquiryEmail({
      entryDate,
      userType:             s(body.userType),
      parentName:           s(body.parentName),
      studentName:          s(body.studentName),
      phone:                s(body.phone),
      whatsappNumber:       s(body.whatsappNumber),
      email:                s(body.email),
      studentClass:         s(body.studentClass),
      board:                s(body.board),
      subjects:             s(body.subjects),
      examPrep:             s(body.examPrep),
      tuitionMode:          s(body.tuitionMode),
      sessionsPerWeek:      s(body.sessionsPerWeek),
      preferredTimings:     s(body.preferredTimings),
      startWhen:            s(body.startWhen),
      city:                 s(body.city),
      area:                 s(body.area) || s(body.otherCity),
      tutorGender:          s(body.tutorGender),
      budget:               s(body.budget),
      specificRequirements: s(body.specificRequirements),
      referralSource:       s(body.referralSource),
    });
  } catch (emailError) {
    // Non-fatal — data already saved to sheet
    console.error("[submit-inquiry] Email failed:", emailError);
  }

  // ── 6. Success ─────────────────────────────────────────────────────────────
  console.info(
    `[submit-inquiry] ✅ ${s(body.parentName)} | ${s(body.phone)} | ${s(body.studentClass)} | ${s(body.city)}`
  );

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}