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
  
  console.log("--- Starting Email Process ---");
  console.log("Target Email:", to);
  console.log("Using Gmail User:", process.env.GMAIL_USER);

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // בדיקת חיבור לשרת גוגל
    console.log("Verifying connection to Gmail...");
    await transporter.verify();
    console.log("Gmail Connection Verified! ✅");

    const userHtml = `
      <div dir="ltr" style="font-family: sans-serif;">
        <h2>Hi ${fullName},</h2>
        <p>Thank you for applying to the <strong>Aharai! Boost Founding Cohort</strong>.</p>
        <p>We have received your application and will review it shortly.</p>
        <br>
        <p>Best,<br>The Aharai! Boost Team</p>
      </div>
    `;

    console.log("Attempting to send user email...");
    const info = await transporter.sendMail({
      from: `"Aharai! Boost" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: "Welcome to Aharai! Boost 🚀",
      html: userHtml,
    });
    console.log("Email sent successfully! Message ID:", info.messageId);

    if (process.env.ADMIN_EMAIL) {
      console.log("Sending admin alert...");
      await transporter.sendMail({
        from: `"System Alert" <${process.env.GMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        subject: `New Lead: ${fullName}`,
        html: `<p>New lead from ${fullName}</p>`,
      });
    }

    return { sent: true };
  } catch (error: any) {
    // זה הלוג הכי חשוב - הוא יגיד לנו בדיוק מה גוגל ענה
    console.error("!!! NODEMAILER FATAL ERROR !!!");
    console.error("Error Message:", error.message);
    console.error("Error Code:", error.code);
    if (error.response) console.error("SMTP Response:", error.response);
    
    return { sent: false };
  }
}