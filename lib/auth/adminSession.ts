import "server-only";

import crypto from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";

type SessionPayload = {
  email: string;
  exp: number; // unix seconds
};

function getSigningSecret() {
  // Prefer a dedicated secret; fall back to Supabase secret so auth still works
  // with minimal env vars (still server-only).
  const secret =
    process.env.ADMIN_SESSION_SECRET ?? process.env.SUPABASE_SECRET_KEY ?? null;
  if (!secret) {
    throw new Error(
      "Missing session secret. Set ADMIN_SESSION_SECRET (recommended) or SUPABASE_SECRET_KEY."
    );
  }
  return secret;
}

function base64urlEncode(input: string | Buffer) {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;
  return buf
    .toString("base64")
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
}

function base64urlDecodeToString(input: string) {
  const pad = input.length % 4 === 0 ? "" : "=".repeat(4 - (input.length % 4));
  const b64 = input.replaceAll("-", "+").replaceAll("_", "/") + pad;
  return Buffer.from(b64, "base64").toString("utf8");
}

function sign(payloadB64: string) {
  const secret = getSigningSecret();
  return crypto
    .createHmac("sha256", secret)
    .update(payloadB64)
    .digest("base64url");
}

export function setAdminSession(email: string, maxAgeSeconds = 60 * 60 * 12) {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = { email, exp: now + maxAgeSeconds };
  const payloadB64 = base64urlEncode(JSON.stringify(payload));
  const sig = sign(payloadB64);
  const value = `${payloadB64}.${sig}`;

  cookies().set(COOKIE_NAME, value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: maxAgeSeconds
  });
}

export function clearAdminSession() {
  cookies().set(COOKIE_NAME, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0
  });
}

export function getAdminSession(): SessionPayload | null {
  const raw = cookies().get(COOKIE_NAME)?.value;
  if (!raw) return null;

  const [payloadB64, sig] = raw.split(".");
  if (!payloadB64 || !sig) return null;

  const expected = sign(payloadB64);
  try {
    // timingSafeEqual throws if lengths differ
    const a = Buffer.from(sig);
    const b = Buffer.from(expected);
    if (a.length !== b.length) return null;
    if (!crypto.timingSafeEqual(a, b)) return null;
  } catch {
    return null;
  }

  try {
    const json = base64urlDecodeToString(payloadB64);
    const payload = JSON.parse(json) as SessionPayload;
    if (!payload?.email || typeof payload.exp !== "number") return null;

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp <= now) return null;

    return payload;
  } catch {
    return null;
  }
}

