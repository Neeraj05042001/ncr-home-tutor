/**
 * POST /api/submit-contact
 *
 * Receives JSON from the contact form.
 *
 * Flow:
 *   1. Validate body
 *   2. Append row → Google Sheets "Contact" tab
 *   3. Send email notification → client via Resend
 *   4. Return { success: true } or { success: false, message }
 *
 * File location: src/app/api/submit-contact/route.ts
 */

import { NextRequest, NextResponse } from "next/server";
import { google }                    from "googleapis";
import { Resend }                    from "resend";

// ─── Route config ─────────────────────────────────────────────────────────────

export const runtime     = "nodejs";
export const maxDuration = 30;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getAuth() {
  return new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      private_key:  process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
}); }

function s(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

function errRes(message: string, status = 400) {
  return NextResponse.json({ success: false, message }, { status });
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name:    string;
  phone:   string;
  email:   string;
  subject: string;
  message: string;
}

// ─── Validation ───────────────────────────────────────────────────────────────

function validate(body: Partial<ContactPayload>): string | null {
  const phone10 = /^[6-9]\d{9}$/;
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!body.name?.trim() || body.name.trim().length < 2)
    return "Name is required";
  if (!phone10.test((body.phone ?? "").replace(/\s/g, "")))
    return "A valid 10-digit phone number is required";
  if (body.email && !emailRx.test(body.email))
    return "Invalid email address";
  if (!body.subject?.trim())
    return "Subject is required";
  if (!body.message?.trim() || body.message.trim().length < 10)
    return "Message must be at least 10 characters";

  return null;
}

// ─── Email HTML ───────────────────────────────────────────────────────────────

function buildContactEmailHtml(
  data: Required<ContactPayload>,
  entryDate: string
): string {
  const row = (label: string, value: string) =>
    value
      ? `<tr>
           <td style="padding:10px 16px;font-weight:600;color:#4A5568;width:120px;
                      border-bottom:1px solid #EDF2F7;white-space:nowrap;font-size:13px;">
             ${label}
           </td>
           <td style="padding:10px 16px;color:#1A2433;
                      border-bottom:1px solid #EDF2F7;font-size:14px;">
             ${value}
           </td>
         </tr>`
      : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F6FA;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#ffffff;
              border-radius:16px;overflow:hidden;
              box-shadow:0 4px 24px rgba(12,35,64,0.10);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#0C2340 0%,#1D5290 100%);padding:28px 32px;">
      <p style="margin:0 0 4px;color:rgba(246,166,35,0.9);font-size:12px;
                font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
        NCR Home Tutor
      </p>
      <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700;line-height:1.3;">
        New Contact Form Message 📬
      </h1>
      <p style="margin:6px 0 0;color:rgba(255,255,255,0.5);font-size:12px;">
        Received on ${entryDate}
      </p>
    </div>
    <div style="height:4px;background:linear-gradient(90deg,#F6A623,#FBDFA0,#E09010);"></div>

    <div style="padding:28px 32px;">

      <!-- Subject highlight -->
      <div style="background:#EEF2F8;border-radius:12px;padding:14px 18px;
                  margin-bottom:20px;border-left:4px solid #F6A623;">
        <p style="margin:0;font-size:11px;color:#718096;font-weight:700;
                  text-transform:uppercase;letter-spacing:0.08em;">Subject</p>
        <p style="margin:4px 0 0;font-size:18px;font-weight:700;color:#0C2340;">
          ${data.subject}
        </p>
      </div>

      <!-- Details -->
      <table style="width:100%;border-collapse:collapse;border-radius:12px;
                    overflow:hidden;border:1px solid #EDF2F7;margin-bottom:20px;">
        <tbody>
          ${row("Name",  data.name)}
          ${row("Phone", `+91 ${data.phone}`)}
          ${row("Email", data.email || "Not provided")}
        </tbody>
      </table>

      <!-- Message -->
      <div style="padding:18px;background:#F4F6FA;border-radius:12px;
                  border:1px solid #E2E8F0;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#718096;
                  text-transform:uppercase;letter-spacing:0.08em;">
          Their Message
        </p>
        <p style="margin:0;font-size:14px;color:#1A2433;line-height:1.7;
                  white-space:pre-wrap;">
          ${data.message}
        </p>
      </div>

      <!-- Quick reply buttons -->
      <div style="margin-top:24px;padding:16px;background:#f0fdf4;
                  border:1px solid #bbf7d0;border-radius:12px;text-align:center;">
        <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#166534;">
          📱 Reply Quickly
        </p>
        <a href="tel:+91${data.phone}"
           style="display:inline-block;margin:4px;padding:9px 18px;
                  background:#0C2340;color:#fff;font-weight:700;
                  border-radius:8px;text-decoration:none;font-size:13px;">
          📞 Call ${data.phone}
        </a>
        <a href="https://wa.me/91${data.phone}?text=${encodeURIComponent(`Hi ${data.name}! Thank you for reaching out to NCR Home Tutor. How can we help you?`)}"
           style="display:inline-block;margin:4px;padding:9px 18px;
                  background:#25D366;color:#fff;font-weight:700;
                  border-radius:8px;text-decoration:none;font-size:13px;">
          💬 WhatsApp
        </a>
        ${data.email
          ? `<a href="mailto:${data.email}"
               style="display:inline-block;margin:4px;padding:9px 18px;
                      background:#F6A623;color:#fff;font-weight:700;
                      border-radius:8px;text-decoration:none;font-size:13px;">
               ✉️ Reply by Email
             </a>`
          : ""}
      </div>

      <!-- Sheet link -->
      <div style="margin-top:20px;text-align:center;">
        <a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}"
           style="display:inline-block;padding:10px 22px;background:#0C2340;
                  color:#ffffff;font-weight:700;border-radius:10px;
                  text-decoration:none;font-size:13px;">
          📊 View in Google Sheet
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#F4F6FA;border-top:1px solid #E2E8F0;
                padding:14px 32px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#718096;">
        NCR Home Tutor · Sector Pi-1, Greater Noida · +91 8076661356
      </p>
      <p style="margin:4px 0 0;font-size:11px;color:#A0AEC0;">
        Automated notification — do not reply to this email.
      </p>
    </div>
  </div>
</body>
</html>`;
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {

  // ── 1. Parse ───────────────────────────────────────────────────────────────
  let body: Partial<ContactPayload>;
  try {
    body = await request.json() as Partial<ContactPayload>;
  } catch {
    return errRes("Invalid request body");
  }

  // ── 2. Validate ────────────────────────────────────────────────────────────
  const error = validate(body);
  if (error) return errRes(error, 422);

  const entryDate = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit", hour12: true,
  });

  // ── 3. Append → Sheets "Contact" tab ──────────────────────────────────────
  try {
    const sheets = google.sheets({ version: "v4", auth: getAuth() });
    await sheets.spreadsheets.values.append({
      spreadsheetId:    process.env.GOOGLE_SHEET_ID!,
      range:            "Contact!A:G",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          entryDate,         // A
          s(body.name),      // B
          s(body.phone),     // C
          s(body.email),     // D
          s(body.subject),   // E
          s(body.message),   // F
          "New",             // G — Status
        ]],
      },
    });
  } catch (sheetsErr) {
    console.error("[submit-contact] Sheets failed:", sheetsErr);
    return NextResponse.json(
      { success: false, message: "Could not save your message. Please call us on +91 8076661356" },
      { status: 500 }
    );
  }

  // ── 4. Send email ──────────────────────────────────────────────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const from   = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
    const to     = process.env.RESEND_TO_EMAIL!;

    await resend.emails.send({
      from,
      to,
      subject: `📬 Contact Form — ${s(body.name)} | ${s(body.subject)}`,
      html:    buildContactEmailHtml(
        {
          name:    s(body.name),
          phone:   s(body.phone),
          email:   s(body.email),
          subject: s(body.subject),
          message: s(body.message),
        },
        entryDate
      ),
    });
  } catch (emailErr) {
    // Non-fatal — data is in sheet
    console.error("[submit-contact] Email failed:", emailErr);
  }

  // ── 5. Success ─────────────────────────────────────────────────────────────
  console.info(`[submit-contact] ✅ ${s(body.name)} | ${s(body.phone)} | ${s(body.subject)}`);

  return NextResponse.json({ success: true }, { status: 200 });
}

export async function GET() {
  return NextResponse.json({ success: false, message: "Method not allowed" }, { status: 405 });
}