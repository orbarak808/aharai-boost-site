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
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // 1. עיצוב המייל למועמד (HTML מעוצב)
    const userHtml = `
      <div dir="ltr" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
        
        <div style="background-color: #000; padding: 20px; text-align: center;">
          <h1 style="color: #fcd839; margin: 0; font-size: 24px; letter-spacing: 1px;">AHARAI! BOOST</h1>
          <p style="color: #fff; margin: 5px 0 0; font-size: 14px;">NORTH AMERICA</p>
        </div>

        <div style="padding: 30px 20px;">
          <h2 style="color: #2a0a10; margin-top: 0;">Hi ${fullName},</h2>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for reaching out to <strong>Aharai! BOOST North America</strong>.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            As Israel's leading youth organization, <em>Aharai!</em> has spent <strong>29 years</strong> championing the values of <strong>leadership, excellence, and resilience</strong>. 
            We are now expanding our mission to North America, launching an unprecedented summer program designed to cultivate the next generation of Jewish leadership.
          </p>

          <div style="background-color: #f9f9f9; border-left: 4px solid #fcd839; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; font-weight: bold; color: #000;">🗓️ Save the Dates:</p>
            <p style="margin: 5px 0 0; font-size: 18px;">July 1st – August 10th, 2026</p>
          </div>

          <p style="font-size: 16px; line-height: 1.6;">
            A member of our team will reach out to you shortly to tell you more about the program and answer any questions.
          </p>
          
          <p style="font-size: 16px; line-height: 1.6;">Welcome to the family!</p>
          <p style="font-weight: bold;">The Aharai! BOOST Team</p>
        </div>

        <div style="background-color: #f4f4f4; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin-bottom: 15px;">
            <a href="https://aharai.org.il/" style="text-decoration: none; color: #2a0a10; font-weight: bold; margin: 0 10px;">🌐 Main Website</a>
            |
            <a href="https://www.instagram.com/aharai.america" style="text-decoration: none; color: #2a0a10; font-weight: bold; margin: 0 10px;">📸 Instagram</a>
          </p>
          <p style="font-size: 12px; color: #888; margin: 0;">
            © 2026 Aharai! Boost North America. All rights reserved.
          </p>
        </div>
      </div>
    `;

    // שליחת המייל למועמד
    await transporter.sendMail({
      from: `"Aharai! BOOST" <${process.env.GMAIL_USER}>`,
      to: to,
      subject: "Welcome to Aharai! BOOST North America 🚀",
      html: userHtml,
    });

    // 2. מייל לאדמין (ללא שינוי)
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
    console.error("Critical Email Error:", error);
    return { sent: false };
  }
}