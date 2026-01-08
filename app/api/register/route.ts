import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log("🚀 START: Email process initiated");

  try {
    const body = await request.json();
    
    // 1. הדפסת כל המידע שהתקבל כדי שנבין מה השמות הנכונים
    console.log("📦 Full Data Received:", JSON.stringify(body, null, 2));

    // 2. מנגנון חכם למציאת השם (בודק את כל האפשרויות)
    const name = body.name || body.fullName || body.firstName || body['First Name'] || 'Friend';
    const email = body.email || body.Email;
    const phone = body.phone || body.tel || '';
    const state = body.state || body.region || '';

    // טעינת הספרייה
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

    // 3. התוכן המלא והשיווקי (החזרתי את הכל!)
    const mailOptions = {
      from: `Aharai Boost <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Building the Next Generation of Jewish Leadership: Aharai! Boost 2026',
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; direction: ltr;">
          <h2 style="color: #2c3e50;">Dear ${name},</h2>
          
          <p>History has taught us that the strength of our people lies in our ability to grow, flourish, and lead with confidence. We believe that true leadership stems from a deep connection to our roots and an unwavering commitment to a thriving future.</p>
          
          <p>I am writing to share an exciting opportunity for rising high school seniors, recent graduates, and rising college freshman students to join the founding cohort of <strong>Aharai! Boost</strong>, an elite leadership program in Israel designed for this new reality.</p>
          
          <p>Powered by <strong>Aharai!</strong> - Israel’s leading youth movement with nearly 30 years of excellence - this program builds the next generation of leadership by uniting American and Canadian youth with elite Israeli pre-army peers.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #d32f2f; margin-top: 0; border-bottom: 2px solid #d32f2f; padding-bottom: 5px; display: inline-block;">Program Highlights:</h3>
            <ul style="padding-left: 20px;">
              <li style="margin-bottom: 10px;"><strong>Duration & Location:</strong> A transformative six-week experience (Summer 2026) based at a secure coastal facility in Athlit with stunning sea views.</li>
              <li style="margin-bottom: 10px;"><strong>A 360° Journey:</strong> A curriculum focusing on "Body, Mind, and Land" through trekking the Holy Land and immersive landscapes.</li>
              <li style="margin-bottom: 10px;"><strong>Mental Fortitude & Roots:</strong> Deep-dive workshops dedicated to resilience, Jewish identity, and history.</li>
              <li style="margin-bottom: 10px;"><strong>Start-Up Nation Access:</strong> Exclusive exposure to Israel’s most advanced industries.</li>
              <li style="margin-bottom: 10px;"><strong>The Israeli Mosaic:</strong> Respectful, in-depth encounters with Israel’s diverse populations.</li>
              <li><strong>Safety & Professionalism:</strong> 29 years of safe operations with 24/7 staff availability, medical personnel on-site, and coordination with Israeli security forces.</li>
            </ul>
          </div>

          <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffc107; margin: 20px 0;">
            <p style="margin: 0; color: #856404;"><strong>Join the Vanguard:</strong> We are looking for the first 100 pioneers to become part of Aharai! Boost history. Applications are reviewed on a rolling basis and include a formal interview process.</p>
          </div>

          <p>Together, we can ensure our youth return more mature, independent, and connected to their heritage.</p>

          <br>
          <p>Best regards,</p>
          <p><strong>Aharai! Boost America</strong></p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="font-size: 12px; color: #888;">Applicant Details Received:<br>Phone: ${phone}<br>State: ${state}</p>
        </div>
      `,
    };

    console.log("📨 Sending email...");
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");

    return NextResponse.json({ success: true, message: 'Email sent successfully' }, { status: 200 });

  } catch (error: any) {
    console.error("🔥 Error:", error.message || error);
    return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 });
  }
}
