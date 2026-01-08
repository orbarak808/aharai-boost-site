import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // לוג לבדיקה
    console.log("🚀 Incoming Data:", JSON.stringify(body));

    // זיהוי חכם של השדות
    const name = body.name || body.fullName || body['First Name'] || body.firstName || 'Friend';
    const email = body.email || body.Email;
    const phone = body.phone || body.tel || body.mobile || '';
    const state = body.state || body.region || '';

    if (!email) {
      return NextResponse.json({ success: false, error: 'No email provided' }, { status: 400 });
    }

    // טעינת Nodemailer
    const nodemailer = (await import('nodemailer')).default;

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
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; direction: ltr;">
          <h2 style="color: #2c3e50;">Dear ${name},</h2>
          <p>History has taught us that the strength of our people lies in our ability to grow, flourish, and lead with confidence. We believe that true leadership stems from a deep connection to our roots and an unwavering commitment to a thriving future.</p>
          <p>I am writing to share an exciting opportunity for rising high school seniors, recent graduates, and rising college freshman students to join the founding cohort of <strong>Aharai! Boost</strong>, an elite leadership program in Israel designed for this new reality.</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d32f2f; margin-top: 0; border-bottom: 2px solid #d32f2f; padding-bottom: 5px;">Program Highlights:</h3>
            <ul>
              <li style="margin-bottom: 10px;"><strong>Duration & Location:</strong> A transformative six-week experience (Summer 2026) based at a secure coastal facility in Athlit with stunning sea views.</li>
              <li style="margin-bottom: 10px;"><strong>A 360° Journey:</strong> A curriculum focusing on "Body, Mind, and Land" through trekking the Holy Land and immersive landscapes.</li>
              <li style="margin-bottom: 10px;"><strong>Mental Fortitude & Roots:</strong> Deep-dive workshops dedicated to resilience, Jewish identity, and history.</li>
              <li><strong>Start-Up Nation Access:</strong> Exclusive exposure to Israel’s most advanced industries.</li>
            </ul>
          </div>
          <p>Together, we can ensure our youth return more mature, independent, and connected to their heritage.</p>
          <br>
          <p>Best regards,</p>
          <p><strong>Aharai! Boost America</strong></p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    
    // --- כאן התיקון הקריטי לאתר ---
    // אנחנו מחזירים תשובה שהיא "כאילו" נתונים שנשמרו בדאטה-בייס
    return NextResponse.json({ 
      success: true,
      id: Date.now().toString(), // מספר מזהה פיקטיבי
      createdAt: new Date().toISOString(),
      data: body, 
      message: 'Lead created and email sent' 
    }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error:", error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
