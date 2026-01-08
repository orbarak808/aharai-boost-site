import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  console.log("🚀 Function started! Checking variables...");

  // בדיקת בלש: האם המפתחות קיימים בזיכרון?
  const missingVars = [];
  if (!process.env.GMAIL_USER) missingVars.push('GMAIL_USER');
  if (!process.env.GOOGLE_CLIENT_ID) missingVars.push('GOOGLE_CLIENT_ID');
  if (!process.env.GOOGLE_CLIENT_SECRET) missingVars.push('GOOGLE_CLIENT_SECRET');
  if (!process.env.GOOGLE_REFRESH_TOKEN) missingVars.push('GOOGLE_REFRESH_TOKEN');

  if (missingVars.length > 0) {
    console.error("❌ CRITICAL ERROR: Missing Environment Variables:", missingVars);
    return NextResponse.json({ success: false, error: 'Server config error: Missing variables' }, { status: 500 });
  }

  console.log("✅ All variables exist. Parsing body...");

  try {
    const body = await request.json();
    const { name, email, phone, age, state } = body;
    console.log(`📦 Preparing to send email to: ${email} (Name: ${name})`);

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.GMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      },
    });

    const mailOptions = {
      from: `Aharai Boost <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Building the Next Generation of Jewish Leadership: Aharai! Boost 2026',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
          <h2 style="color: #2c3e50;">Dear ${name},</h2>
          <p>History has taught us that the strength of our people lies in our ability to grow, flourish, and lead with confidence.</p>
          <p>I am writing to share an exciting opportunity for rising high school seniors, recent graduates, and rising college freshman students to join the founding cohort of <strong>Aharai! Boost</strong>.</p>
          <h3 style="color: #d32f2f;">Program Highlights:</h3>
          <ul>
            <li><strong>Duration & Location:</strong> Summer 2026, Athlit, Israel.</li>
            <li><strong>A 360° Journey:</strong> Body, Mind, and Land.</li>
            <li><strong>Start-Up Nation Access:</strong> Exclusive exposure to industries.</li>
          </ul>
          <p>Together, we can ensure our youth return more mature, independent, and connected to their heritage.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Aharai! Boost America</strong></p>
        </div>
      `,
    };

    console.log("📨 Attempting to send mail now...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    return NextResponse.json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    // הדפסת השגיאה המלאה ללוג
    console.error("❌ ERROR sending email details:", error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
