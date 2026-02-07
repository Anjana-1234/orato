import nodemailer from "nodemailer";

/**
 * Email Service for Orato Platform
 * Handles sending emails via Gmail SMTP
 */

// Create reusable transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "orato.platform@gmail.com",
    pass: "gomd rpol ckua zcrk",  //  actual password
  },
});
/**
 * Send OTP email to user
 * @param {string} email - Recipient email address
 * @param {string} otp - 6-digit OTP code
 */
export const sendOtpEmail = async (email, otp) => {
  try {
    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Password Reset OTP - Orato Platform",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 10px;
            }
            .header {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: white;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .otp-box {
              background: #f0f0f0;
              border: 2px dashed #667eea;
              border-radius: 8px;
              padding: 20px;
              text-align: center;
              margin: 20px 0;
            }
            .otp-code {
              font-size: 32px;
              font-weight: bold;
              color: #667eea;
              letter-spacing: 8px;
              font-family: 'Courier New', monospace;
            }
            .warning {
              color: #e74c3c;
              font-size: 14px;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 20px;
              font-size: 12px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📚 Orato Platform</h1>
              <p>Student Feedback System</p>
            </div>
            <div class="content">
              <h2>Hello!</h2>
              <p>You requested to reset your password for Orato Platform. Use the OTP code below to proceed:</p>
              
              <div class="otp-box">
                <p style="margin: 0; font-size: 14px; color: #666;">Your OTP Code</p>
                <div class="otp-code">${otp}</div>
                <p style="margin: 10px 0 0 0; font-size: 12px; color: #999;">Valid for 10 minutes</p>
              </div>
              
              <p>Enter this code on the password reset page to create a new password.</p>
              
              <p class="warning">
                ⚠️ If you didn't request this, please ignore this email. Your password will remain unchanged.
              </p>
              
              <p>For security reasons, do not share this code with anyone.</p>
              
              <p>Best regards,<br>The Orato Team</p>
            </div>
            <div class="footer">
              <p>This is an automated message, please do not reply to this email.</p>
              <p>&copy; 2026 Orato Platform. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
Hello!

You requested to reset your password for Orato Platform.

Your OTP Code: ${otp}

This code is valid for 10 minutes.

Enter this code on the password reset page to create a new password.

If you didn't request this, please ignore this email.

Best regards,
The Orato Team
      `,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to ${email}`);
    console.log(`   Message ID: ${info.messageId}`);
    
    return { success: true, messageId: info.messageId };
    
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

/**
 * Verify email configuration on server startup
 */

export const verifyEmailConfig = async () => {
  try {
    await transporter.verify();
    console.log("✅ Email service is ready to send emails");
    return true;
  } catch (error) {
    console.error("❌ Email service configuration error:", error);
    return false;
  }
};