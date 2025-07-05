const sendEmail = require("./mailer");

const sendOtp = async (recipientEmail, otp) => {
  const htmlContent = `
    <p>Thanks for registering with Rent Now!</p><br>
    <p>Your One-Time Password (OTP) is: <strong>${otp}</strong></p><br>
    <p>Please enter this OTP in the app to complete your registration. It is valid for 10 minutes.</p><br><br>
    <p>If you did not request this, please ignore this email.</p><br><br>
    <p>Support Team,<br>Rent Now</p>
  `;

  await sendEmail({
    to: recipientEmail,
    subject: "Verify your account - OTP",
    html: htmlContent,
  });
};

module.exports = sendOtp;
