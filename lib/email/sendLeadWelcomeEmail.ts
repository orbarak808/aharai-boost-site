import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  fullName: string;
  // פרמטרים נוספים לדיווח לאדמין
  phone?: string;
  age?: string;
  location?: string;
  source?: string;
  message?: string;
}

export async function sendLeadWelcomeEmail({ 
  to, 
  fullName, 
  phone, 
  age, 
  location, 
  source, 
  message 
}: EmailParams): Promise<{ sent: boolean }> {
  
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    // 1. מייל למועמד (הודעה מעוצבת)
    const userHtml = `
      <div dir="ltr" style="font-family: sans-serif;">
        <h2>Hi ${fullName},</h2>
        <p>Thank you for applying to the <strong>Aharai! Boost Founding Cohort</strong>.</p>
        <p>We have received your application and will review it shortly.</p>
        <br>
        <p>Best,<br>The Aharai! Boost Team</p>
      </div>
    `;

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: to,
      subject: "Welcome to Aharai! Boost 🚀",
      html: userHtml,
    });

    // 2. מייל לאדמין (רק אם מוגדר ADMIN_EMAIL)
    if (process.env.ADMIN_EMAIL) {
      const adminHtml = `
        <div dir="ltr">
          <h3>New Lead Alert 🚨</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${to}</p>
          <p><strong>Phone:</strong> ${phone || '-'}</p>
          <p><strong>Age:</strong> ${age || '-'}</p>
          <p><strong>Location:</strong> ${location || '-'}</p>
          <p><strong>Source:</strong> ${source || '-'}</p>
          <p><strong>Message:</strong><br>${message || '-'}</p>
        </div>
      `;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${fullName}`,
        html: adminHtml,
      });
    }

    return { sent: true };
  } catch (error) {
    console.error("Email error:", error);
    return { sent: false };
  }
}