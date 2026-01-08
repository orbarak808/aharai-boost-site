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
 * Current implementation uses Resend via fetch if env vars are present.
 * If not configured, it becomes a safe no-op (returns false).
 */
export async function sendLeadWelcomeEmail({
  to,
  fullName
}: SendLeadWelcomeEmailArgs) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM;

  if (!apiKey || !from) return { sent: false as const };

  const subject = leadWelcomeSubject();
  const html = leadWelcomeHtml({ fullName });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html
    })
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Email send failed (${res.status}): ${text}`);
  }

  return { sent: true as const };
}
