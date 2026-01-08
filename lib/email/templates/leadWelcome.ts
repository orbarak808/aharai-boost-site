type LeadWelcomeTemplateParams = {
  fullName: string;
};

export function leadWelcomeSubject() {
  return "Welcome to Aharai Boost";
}

export function leadWelcomeHtml({ fullName }: LeadWelcomeTemplateParams) {
  // Replace with your custom template later.
  return `
    <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial; line-height: 1.6;">
      <h1 style="margin: 0 0 12px;">Hi ${escapeHtml(fullName)} 👋</h1>
      <p style="margin: 0 0 12px;">
        Thanks for signing up. We received your application and we’ll reach out soon with next steps.
      </p>
      <p style="margin: 0;">
        — Aharai Team
      </p>
    </div>
  `;
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
