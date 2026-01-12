import nodemailer from "nodemailer";

interface EmailParams {
  to: string;
  fullName: string;
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
    // === שינוי כאן: מעבר לשיטת App Password פשוטה ויציבה ===
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // משתמש בסיסמה החדשה שהגדרת ב-Vercel
      },
    });

    // 1. מייל למועמד
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
      from: `"Aharai! Boost" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: "Welcome to Aharai! Boost 🚀",
      html: userHtml,
    });

    // 2. מייל לאדמין
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
        from: `"System Alert" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${fullName}`,
        html: adminHtml,
      });
    }

    return { sent: true };
  } catch (error) {
    // הדפסת לוג מפורט ל-Vercel במקרה של תקלה
    console.error("Critical Email Error:", error);
    return { sent: false };
  }
}