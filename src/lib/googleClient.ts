/**
 * NCR Home Tutor — Google Sheets + Cloudinary Client
 *
 * Responsibilities:
 *   • Google Sheets  — append tutor registration rows
 *   • Cloudinary     — upload ID proof files, return secure URL
 */

import { google } from "googleapis";
import { v2 as cloudinary } from "cloudinary";

// ─── Env helper ───────────────────────────────────────────────────────────────

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `[googleClient] Missing environment variable: "${name}". ` +
      `Check your .env.local file.`
    );
  }
  return value;
}

// ─── Google Auth (cached) ─────────────────────────────────────────────────────

let _auth: InstanceType<typeof google.auth.GoogleAuth> | null = null;

function getAuth() {
  if (_auth) return _auth;
  _auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: requireEnv("GOOGLE_SERVICE_ACCOUNT_EMAIL"),
      private_key:  requireEnv("GOOGLE_PRIVATE_KEY").replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return _auth;
}

// ─── Cloudinary (cached) ──────────────────────────────────────────────────────

let _cloudinaryReady = false;

function getCloudinary() {
  if (!_cloudinaryReady) {
    cloudinary.config({
      cloud_name: requireEnv("CLOUDINARY_CLOUD_NAME"),
      api_key:    requireEnv("CLOUDINARY_API_KEY"),
      api_secret: requireEnv("CLOUDINARY_API_SECRET"),
      secure:     true,
    });
    _cloudinaryReady = true;
  }
  return cloudinary;
}

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TutorRowData {
  entryDate:             string; // Col A
  fullName:              string; // Col B
  gender:                string; // Col C
  phone:                 string; // Col D
  alternatePhone:        string; // Col E
  email:                 string; // Col F
  correspondenceAddress: string; // Col G
  permanentAddress:      string; // Col H
  city:                  string; // Col I
  delhiArea:             string; // Col J
  otherCity:             string; // Col K
  experience:            string; // Col L
  subjects:              string; // Col M
  fromClass:             string; // Col N
  toClass:               string; // Col O
  preferredLocations:    string; // Col P
  hasVehicle:            string; // Col Q
  qualification:         string; // Col R
  idProofType:           string; // Col S
  idProofLink:           string; // Col T
}

// ─── Google Sheets — append row ───────────────────────────────────────────────

export async function appendTutorRow(data: TutorRowData): Promise<void> {
  const sheets        = google.sheets({ version: "v4", auth: getAuth() });
  const spreadsheetId = requireEnv("GOOGLE_SHEET_ID");

  const row = [
    data.entryDate,
    data.fullName,
    data.gender,
    data.phone,
    data.alternatePhone,
    data.email,
    data.correspondenceAddress,
    data.permanentAddress,
    data.city,
    data.delhiArea,
    data.otherCity,
    data.experience,
    data.subjects,
    data.fromClass,
    data.toClass,
    data.preferredLocations,
    data.hasVehicle,
    data.qualification,
    data.idProofType,
    // Renders as a clickable link inside Google Sheets
    data.idProofLink
      ? `=HYPERLINK("${data.idProofLink}","📎 View ID Proof")`
      : "Not Uploaded",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range:            "Tutors!A:T",
    valueInputOption: "USER_ENTERED",
    requestBody:      { values: [row] },
  });
}

// ─── Cloudinary — upload ID proof ─────────────────────────────────────────────

export async function uploadIdProof(
  fileBuffer: Buffer,
  mimeType:   string,
  publicId:   string
): Promise<string> {
  const cld          = getCloudinary();
  // PDFs must use resource_type "raw" in Cloudinary — images use "image"
  const resourceType = mimeType === "application/pdf" ? "raw" : "image";

  return new Promise<string>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      {
        folder:        "ncr-home-tutor/id-proofs",
        public_id:     publicId,
        resource_type: resourceType,
        overwrite:     false,
        tags:          ["tutor-id-proof"],
      },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Cloudinary returned no result"));
        } else {
          resolve(result.secure_url);
        }
      }
    );
    // Write the buffer into the upload stream
    stream.end(fileBuffer);
  });
}

// ─── Public ID builder ────────────────────────────────────────────────────────

/**
 * Builds a clean unique identifier for the file in Cloudinary.
 * Format: TutorName_DDMMYYYY_HHMMSS
 * Example: Ramesh_Kumar_18042026_143022
 */
export function buildPublicId(tutorName: string): string {
  const name = tutorName
    .trim()
    .replace(/[^a-zA-Z\s]/g, "")
    .replace(/\s+/g, "_")
    .slice(0, 30);

  const now  = new Date();
  const pad  = (n: number) => String(n).padStart(2, "0");
  const date = `${pad(now.getDate())}${pad(now.getMonth() + 1)}${now.getFullYear()}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  return `${name}_${date}_${time}`;
}