// /**
//  * NCR Home Tutor — Email Notifications via Resend
//  *
//  * Sends a formatted registration notification to the client
//  * every time a tutor submits the registration form.
//  *
//  * File location: src/lib/mailer.ts
//  */

// import { Resend } from "resend";

// // ─── Resend client (cached) ───────────────────────────────────────────────────

// let _resend: Resend | null = null;

// function getResend(): Resend {
//   if (!_resend) {
//     const apiKey = process.env.RESEND_API_KEY;
//     if (!apiKey) {
//       throw new Error(
//         '[mailer] Missing environment variable: "RESEND_API_KEY". ' +
//         "Check your .env.local file."
//       );
//     }
//     _resend = new Resend(apiKey);
//   }
//   return _resend;
// }

// // ─── Types ────────────────────────────────────────────────────────────────────

// export interface TutorEmailData {
//   fullName:           string;
//   gender:             string;
//   phone:              string;
//   alternatePhone:     string;
//   email:              string;
//   city:               string;
//   experience:         string;
//   subjects:           string;
//   fromClass:          string;
//   toClass:            string;
//   preferredLocations: string;
//   qualification:      string;
//   hasVehicle:         string;
//   idProofType:        string;
//   idProofUrl:         string; // Cloudinary URL
//   entryDate:          string;
// }

// // ─── Email HTML builder ───────────────────────────────────────────────────────

// function buildEmailHtml(data: TutorEmailData): string {
//   const idProofSection = data.idProofUrl
//     ? `<a href="${data.idProofUrl}"
//           style="display:inline-block;margin-top:8px;padding:10px 20px;
//                  background:#F6A623;color:#fff;font-weight:700;
//                  border-radius:8px;text-decoration:none;font-size:14px;">
//          📎 View ID Proof (${data.idProofType})
//        </a>`
//     : `<span style="color:#e53e3e;font-weight:600;">Not uploaded</span>`;

//   const row = (label: string, value: string) =>
//     value
//       ? `<tr>
//            <td style="padding:10px 16px;font-weight:600;color:#4A5568;
//                       width:180px;border-bottom:1px solid #EDF2F7;
//                       white-space:nowrap;">${label}</td>
//            <td style="padding:10px 16px;color:#1A2433;
//                       border-bottom:1px solid #EDF2F7;">${value}</td>
//          </tr>`
//       : "";

//   return `
// <!DOCTYPE html>
// <html lang="en">
// <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
// <body style="margin:0;padding:0;background:#F4F6FA;font-family:'Segoe UI',Arial,sans-serif;">

//   <div style="max-width:600px;margin:32px auto;background:#ffffff;
//               border-radius:16px;overflow:hidden;
//               box-shadow:0 4px 24px rgba(12,35,64,0.10);">

//     <!-- Header -->
//     <div style="background:linear-gradient(135deg,#0C2340 0%,#1D5290 100%);
//                 padding:32px 32px 24px;">
//       <p style="margin:0 0 4px;color:rgba(246,166,35,0.9);font-size:12px;
//                 font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
//         NCR Home Tutor
//       </p>
//       <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;
//                  line-height:1.3;">
//         New Tutor Registration 🎉
//       </h1>
//       <p style="margin:8px 0 0;color:rgba(255,255,255,0.6);font-size:13px;">
//         Submitted on ${data.entryDate}
//       </p>
//     </div>

//     <!-- Saffron accent bar -->
//     <div style="height:4px;background:linear-gradient(90deg,#F6A623,#FBDFA0,#E09010);"></div>

//     <div style="padding:28px 32px;">

//       <!-- Tutor name highlight -->
//       <div style="background:#EEF2F8;border-radius:12px;padding:16px 20px;
//                   margin-bottom:24px;border-left:4px solid #F6A623;">
//         <p style="margin:0;font-size:12px;color:#718096;
//                   font-weight:700;text-transform:uppercase;letter-spacing:0.08em;">
//           Applicant
//         </p>
//         <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#0C2340;">
//           ${data.fullName}
//         </p>
//       </div>

//       <!-- Details table -->
//       <table style="width:100%;border-collapse:collapse;border-radius:12px;
//                     overflow:hidden;border:1px solid #EDF2F7;font-size:14px;">
//         <tbody>
//           ${row("Gender",        data.gender)}
//           ${row("Phone",         `+91 ${data.phone}`)}
//           ${row("Alt. Phone",    data.alternatePhone ? `+91 ${data.alternatePhone}` : "")}
//           ${row("Email",         data.email)}
//           ${row("City",          data.city)}
//           ${row("Experience",    data.experience)}
//           ${row("Subjects",      data.subjects)}
//           ${row("Classes",       `${data.fromClass} → ${data.toClass}`)}
//           ${row("Locations",     data.preferredLocations)}
//           ${row("Qualification", data.qualification)}
//           ${row("Has Vehicle",   data.hasVehicle)}
//         </tbody>
//       </table>

//       <!-- ID Proof section -->
//       <div style="margin-top:24px;padding:20px;background:#FFFBF0;
//                   border:1px solid #FDF0D5;border-radius:12px;">
//         <p style="margin:0 0 8px;font-size:12px;font-weight:700;
//                   color:#B87000;text-transform:uppercase;letter-spacing:0.08em;">
//           ID Proof — ${data.idProofType}
//         </p>
//         ${idProofSection}
//       </div>

//       <!-- CTA -->
//       <div style="margin-top:24px;text-align:center;">
//         <a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}"
//            style="display:inline-block;padding:12px 28px;background:#0C2340;
//                   color:#ffffff;font-weight:700;border-radius:10px;
//                   text-decoration:none;font-size:14px;">
//           📊 Open Google Sheet
//         </a>
//       </div>

//     </div>

//     <!-- Footer -->
//     <div style="background:#F4F6FA;border-top:1px solid #E2E8F0;
//                 padding:16px 32px;text-align:center;">
//       <p style="margin:0;font-size:12px;color:#718096;">
//         NCR Home Tutor · Sector Pi-1, Greater Noida
//       </p>
//       <p style="margin:4px 0 0;font-size:11px;color:#A0AEC0;">
//         This is an automated notification. Do not reply to this email.
//       </p>
//     </div>

//   </div>

// </body>
// </html>`;
// }

// // ─── Send registration email ──────────────────────────────────────────────────

// export async function sendTutorRegistrationEmail(
//   data: TutorEmailData
// ): Promise<void> {
//   const resend  = getResend();
//   const from    = process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
//   const to      = process.env.RESEND_TO_EMAIL   ?? "";

//   if (!to) {
//     throw new Error(
//       '[mailer] Missing environment variable: "RESEND_TO_EMAIL". ' +
//       "Check your .env.local file."
//     );
//   }

//   const { error } = await resend.emails.send({
//     from,
//     to,
//     subject: `📋 New Tutor Registration — ${data.fullName} (${data.city})`,
//     html:    buildEmailHtml(data),
//   });

//   if (error) {
//     throw new Error(`[mailer] Resend failed: ${JSON.stringify(error)}`);
//   }
// }


/**
 * NCR Home Tutor — Email Notifications via Resend
 *
 * Exports:
 *   sendTutorRegistrationEmail — fires when a tutor registers
 *   sendInquiryEmail           — fires when a parent/student submits an inquiry
 *
 * File location: src/lib/mailer.ts
 */

import { Resend } from "resend";

// ─── Client (cached) ──────────────────────────────────────────────────────────

let _resend: Resend | null = null;

function getResend(): Resend {
  if (!_resend) {
    const key = process.env.RESEND_API_KEY;
    if (!key) throw new Error("[mailer] Missing RESEND_API_KEY");
    _resend = new Resend(key);
  }
  return _resend;
}

function getFrom(): string {
  return process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev";
}

function getTo(): string {
  const to = process.env.RESEND_TO_EMAIL;
  if (!to) throw new Error("[mailer] Missing RESEND_TO_EMAIL");
  return to;
}

// ─── Shared HTML helpers ──────────────────────────────────────────────────────

const emailWrapper = (content: string) => `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F4F6FA;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#ffffff;
              border-radius:16px;overflow:hidden;
              box-shadow:0 4px 24px rgba(12,35,64,0.10);">
    ${content}
  </div>
</body>
</html>`;

const emailHeader = (title: string, subtitle: string, date: string) => `
  <div style="background:linear-gradient(135deg,#0C2340 0%,#1D5290 100%);padding:32px 32px 24px;">
    <p style="margin:0 0 4px;color:rgba(246,166,35,0.9);font-size:12px;
              font-weight:700;text-transform:uppercase;letter-spacing:0.1em;">
      NCR Home Tutor
    </p>
    <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;line-height:1.3;">
      ${title}
    </h1>
    <p style="margin:8px 0 0;color:rgba(255,255,255,0.65);font-size:13px;">${subtitle}</p>
    <p style="margin:4px 0 0;color:rgba(255,255,255,0.4);font-size:12px;">Submitted on ${date}</p>
  </div>
  <div style="height:4px;background:linear-gradient(90deg,#F6A623,#FBDFA0,#E09010);"></div>`;

const emailFooter = () => `
  <div style="background:#F4F6FA;border-top:1px solid #E2E8F0;
              padding:16px 32px;text-align:center;">
    <p style="margin:0;font-size:12px;color:#718096;">
      NCR Home Tutor · Sector Pi-1, Greater Noida · +91 8076661356
    </p>
    <p style="margin:4px 0 0;font-size:11px;color:#A0AEC0;">
      Automated notification — please do not reply to this email.
    </p>
  </div>`;

const tableRow = (label: string, value: string) =>
  value
    ? `<tr>
         <td style="padding:10px 16px;font-weight:600;color:#4A5568;width:170px;
                    border-bottom:1px solid #EDF2F7;white-space:nowrap;font-size:13px;">
           ${label}
         </td>
         <td style="padding:10px 16px;color:#1A2433;
                    border-bottom:1px solid #EDF2F7;font-size:14px;">
           ${value}
         </td>
       </tr>`
    : "";

const highlightBox = (eyebrow: string, name: string) => `
  <div style="background:#EEF2F8;border-radius:12px;padding:16px 20px;
              margin-bottom:24px;border-left:4px solid #F6A623;">
    <p style="margin:0;font-size:11px;color:#718096;font-weight:700;
              text-transform:uppercase;letter-spacing:0.08em;">${eyebrow}</p>
    <p style="margin:4px 0 0;font-size:22px;font-weight:700;color:#0C2340;">${name}</p>
  </div>`;

const sheetButton = (label: string) => `
  <div style="margin-top:24px;text-align:center;">
    <a href="https://docs.google.com/spreadsheets/d/${process.env.GOOGLE_SHEET_ID}"
       style="display:inline-block;padding:12px 28px;background:#0C2340;
              color:#ffffff;font-weight:700;border-radius:10px;
              text-decoration:none;font-size:14px;">${label}</a>
  </div>`;

// ─────────────────────────────────────────────────────────────────────────────
// TUTOR REGISTRATION EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export interface TutorEmailData {
  entryDate:          string;
  fullName:           string;
  gender:             string;
  phone:              string;
  alternatePhone:     string;
  email:              string;
  city:               string;
  experience:         string;
  subjects:           string;
  fromClass:          string;
  toClass:            string;
  preferredLocations: string;
  qualification:      string;
  hasVehicle:         string;
  idProofType:        string;
  idProofUrl:         string;
}

function buildTutorEmailHtml(data: TutorEmailData): string {
  const idSection = data.idProofUrl
    ? `<a href="${data.idProofUrl}"
          style="display:inline-block;margin-top:8px;padding:10px 20px;
                 background:#F6A623;color:#fff;font-weight:700;
                 border-radius:8px;text-decoration:none;font-size:14px;">
         📎 View ${data.idProofType}
       </a>`
    : `<span style="color:#e53e3e;font-weight:600;">Not uploaded — follow up with tutor</span>`;

  return emailWrapper(`
    ${emailHeader(
      "New Tutor Registration 🎓",
      `${data.fullName} has applied to join the tutor network`,
      data.entryDate
    )}
    <div style="padding:28px 32px;">
      ${highlightBox("New Applicant", data.fullName)}
      <table style="width:100%;border-collapse:collapse;border-radius:12px;
                    overflow:hidden;border:1px solid #EDF2F7;">
        <tbody>
          ${tableRow("Gender",        data.gender)}
          ${tableRow("Phone",         `+91 ${data.phone}`)}
          ${tableRow("Alt. Phone",    data.alternatePhone ? `+91 ${data.alternatePhone}` : "")}
          ${tableRow("Email",         data.email)}
          ${tableRow("City",          data.city)}
          ${tableRow("Experience",    data.experience)}
          ${tableRow("Subjects",      data.subjects)}
          ${tableRow("Classes",       `${data.fromClass} → ${data.toClass}`)}
          ${tableRow("Locations",     data.preferredLocations)}
          ${tableRow("Qualification", data.qualification)}
          ${tableRow("Has Vehicle",   data.hasVehicle)}
          ${tableRow("ID Proof",      data.idProofType)}
        </tbody>
      </table>
      <div style="margin-top:20px;padding:20px;background:#FFFBF0;
                  border:1px solid #FDF0D5;border-radius:12px;">
        <p style="margin:0 0 8px;font-size:11px;font-weight:700;color:#B87000;
                  text-transform:uppercase;letter-spacing:0.08em;">ID Proof Document</p>
        ${idSection}
      </div>
      ${sheetButton("📊 View All Tutors in Sheet")}
    </div>
    ${emailFooter()}
  `);
}

export async function sendTutorRegistrationEmail(data: TutorEmailData): Promise<void> {
  const { error } = await getResend().emails.send({
    from:    getFrom(),
    to:      getTo(),
    subject: `🎓 New Tutor — ${data.fullName} (${data.city})`,
    html:    buildTutorEmailHtml(data),
  });
  if (error) throw new Error(`[mailer] ${JSON.stringify(error)}`);
}

// ─────────────────────────────────────────────────────────────────────────────
// INQUIRY EMAIL
// ─────────────────────────────────────────────────────────────────────────────

export interface InquiryEmailData {
  entryDate:            string;
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
  tutorGender:          string;
  budget:               string;
  specificRequirements: string;
  referralSource:       string;
}

function buildInquiryEmailHtml(data: InquiryEmailData): string {
  const isParent = data.userType === "parent";
  const isUrgent = data.startWhen === "As soon as possible";
  const urgentColor = isUrgent ? "#e53e3e" : "#38a169";
  const urgentLabel = isUrgent ? "🔴 URGENT — Respond Today" : "🟢 Standard Priority";

  const waMsg = encodeURIComponent(
    `Hi ${data.parentName}! I'm calling from NCR Home Tutor regarding your inquiry for a ${data.studentClass} tutor in ${data.city}. We have found a great match for you!`
  );

  return emailWrapper(`
    ${emailHeader(
      "New Student Inquiry 📋",
      `${data.parentName} is looking for a ${data.studentClass} tutor`,
      data.entryDate
    )}
    <div style="padding:28px 32px;">

      <!-- Urgency badge -->
      <div style="display:inline-block;padding:6px 14px;
                  background:${urgentColor}20;border:1px solid ${urgentColor}40;
                  border-radius:20px;font-size:12px;font-weight:700;
                  color:${urgentColor};margin-bottom:20px;">
        ${urgentLabel}
      </div>

      ${highlightBox(isParent ? "Parent / Guardian" : "Student", data.parentName)}

      <table style="width:100%;border-collapse:collapse;border-radius:12px;
                    overflow:hidden;border:1px solid #EDF2F7;">
        <tbody>
          ${isParent ? tableRow("Student Name", data.studentName) : ""}
          ${tableRow("Phone",           `+91 ${data.phone}`)}
          ${tableRow("WhatsApp",        data.whatsappNumber !== data.phone
                                          ? `+91 ${data.whatsappNumber}`
                                          : "Same as phone")}
          ${tableRow("Email",           data.email)}
          ${tableRow("Class",           data.studentClass)}
          ${tableRow("Board",           data.board)}
          ${tableRow("Subjects",        data.subjects)}
          ${data.examPrep ? tableRow("Exam Prep", data.examPrep) : ""}
          ${tableRow("Mode",            data.tuitionMode)}
          ${tableRow("Sessions / Week", data.sessionsPerWeek)}
          ${tableRow("Timings",         data.preferredTimings)}
          ${tableRow("Start When",      data.startWhen)}
          ${tableRow("City",            data.city)}
          ${tableRow("Area",            data.area)}
          ${tableRow("Tutor Gender",    data.tutorGender)}
          ${tableRow("Budget",          data.budget)}
          ${tableRow("Referred By",     data.referralSource)}
        </tbody>
      </table>

      ${data.specificRequirements ? `
        <div style="margin-top:20px;padding:16px 20px;background:#EEF2F8;
                    border-radius:12px;border-left:4px solid #1D5290;">
          <p style="margin:0 0 6px;font-size:11px;font-weight:700;color:#4A5568;
                    text-transform:uppercase;letter-spacing:0.08em;">
            Specific Requirements
          </p>
          <p style="margin:0;font-size:14px;color:#1A2433;line-height:1.6;font-style:italic;">
            "${data.specificRequirements}"
          </p>
        </div>` : ""}

      <!-- Quick action buttons -->
      <div style="margin-top:20px;padding:16px;background:#f0fdf4;
                  border:1px solid #bbf7d0;border-radius:12px;text-align:center;">
        <p style="margin:0 0 10px;font-size:13px;font-weight:700;color:#166534;">
          📱 Contact This Parent Now
        </p>
        <a href="tel:+91${data.phone}"
           style="display:inline-block;margin:4px;padding:10px 20px;
                  background:#0C2340;color:#fff;font-weight:700;
                  border-radius:8px;text-decoration:none;font-size:13px;">
          📞 Call +91 ${data.phone}
        </a>
        <a href="https://wa.me/91${data.phone}?text=${waMsg}"
           style="display:inline-block;margin:4px;padding:10px 20px;
                  background:#25D366;color:#fff;font-weight:700;
                  border-radius:8px;text-decoration:none;font-size:13px;">
          💬 WhatsApp
        </a>
      </div>

      ${sheetButton("📊 View All Inquiries in Sheet")}
    </div>
    ${emailFooter()}
  `);
}

export async function sendInquiryEmail(data: InquiryEmailData): Promise<void> {
  const isUrgent = data.startWhen === "As soon as possible";
  const subject  = isUrgent
    ? `🔴 URGENT — ${data.parentName} | ${data.studentClass} | ${data.city}`
    : `📋 New Inquiry — ${data.parentName} | ${data.studentClass} | ${data.city}`;

  const { error } = await getResend().emails.send({
    from:    getFrom(),
    to:      getTo(),
    subject,
    html:    buildInquiryEmailHtml(data),
  });
  if (error) throw new Error(`[mailer] ${JSON.stringify(error)}`);
}