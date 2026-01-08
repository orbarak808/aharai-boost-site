import "server-only";

import {
  leadWelcomeHtml,
  leadWelcomeSubject
} from "@/lib/email/templates/leadWelcome";

type SendLeadWelcomeEmailArgs = {
  to: string;
  fullName: string;
};

/**
 * Sends a welcome email after a lead is saved.
 *
 * Gmail implementation via Nodemailer (server-side).
 * If not configured, it becomes a safe no-op (returns false).
 *
 * Best practices (per Nodemailer guidance):
 * - For Gmail, prefer OAuth2; if using a password, use a Google "App Password"
 *   (regular account password / "less secure apps" is not supported).
 * - Keep credentials in env vars; do not hardcode secrets.
 */
export async function sendLeadWelcomeEmail({
  to,
  fullName
}: SendLeadWelcomeEmailArgs) {
  const transport = await getTransporter();
  if (!transport) return { sent: false as const };

  const from = resolveFromAddress();
  if (!from) return { sent: false as const };

  const subject = leadWelcomeSubject();
  const html = leadWelcomeHtml({ fullName });

  const info = await transport.sendMail({
    from,
    to,
    subject,
    html
  });

  if (!info.accepted || info.accepted.length === 0) {
    throw new Error("Email send failed: message not accepted by SMTP server");
  }

  return { sent: true as const };
}

let cachedTransporter: any | null = null;
let cachedTransporterPromise: Promise<any | null> | null = null;

function getNodemailer(): any | null {
  try {
    // Using require() avoids TS module-resolution issues in some Next/ESLint setups.
    // This file is server-only and executed in the Node.js runtime.
    return require("nodemailer");
  } catch {
    return null;
  }
}

async function getTransporter(): Promise<any | null> {
  if (cachedTransporter) return cachedTransporter;
  if (cachedTransporterPromise) return cachedTransporterPromise;

  cachedTransporterPromise = (async () => {
    const transporter = buildGmailTransport();
    if (!transporter) return null;

    // "verify" is useful for early failure in dev and for debugging config issues.
    // In serverless runtimes, verify adds latency; we only do it outside prod.
    if (process.env.NODE_ENV !== "production") {
      try {
        await transporter.verify();
      } catch {
        return null;
      }
    }

    cachedTransporter = transporter;
    return transporter;
  })();

  return cachedTransporterPromise;
}

function resolveFromAddress() {
  // Prefer explicit FROM; fall back to the Gmail auth user.
  return (
    process.env.MAIL_FROM ??
    process.env.GMAIL_FROM ??
    process.env.GMAIL_USER ??
    process.env.NODEMAILER_USER ??
    null
  );
}

function buildGmailTransport(): any | null {
  const nodemailer = getNodemailer();
  if (!nodemailer) return null;

  const user = process.env.GMAIL_USER ?? process.env.NODEMAILER_USER ?? null;
  if (!user) return null;

  // Preferred: OAuth2
  const clientId = process.env.GOOGLE_CLIENT_ID ?? null;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET ?? null;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN ?? null;
  if (clientId && clientSecret && refreshToken) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user,
        clientId,
        clientSecret,
        refreshToken
      }
    });
  }

  // Fallback: App Password (NOT your normal Gmail password).
  const appPassword =
    process.env.GMAIL_APP_PASSWORD ?? process.env.NODEMAILER_PASSWORD ?? null;
  if (!appPassword) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user,
      pass: appPassword
    }
  });
}
