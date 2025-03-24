const { mailtrapClient, sender } = require("./mailtrap.config");
const {
  VERIFICATION_EMAIL_TEMPLATE,
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
} = require("./emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace(
        "{verificationCode}",
        verificationToken
      ),
      category: "Verification Email",
    });
    console.log("Email sent successfully", response);
  } catch (err) {
    console.error("Error sending email", err);
    throw new Error(`Error sending verification email, ${err}`);
  }
};

const sendWelcomeEmail = async (email, name) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "9374ec0c-4ce1-4650-a86f-7e0527c6684d",
      template_variables: {
        name: name,
        company_info_name: "Cyberfunk 2077 Auth",
      },
    });
    console.log("Welcome Email sent successfully", response);
  } catch (err) {
    console.error("Error sending welcome email", err);
    throw new Error(`Error sending welcome email, ${err}`);
  }
};

const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Reset Your Password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
      category: "Password Reset",
    });
    console.log("Password Reset Email sent successfully", response);
  } catch (err) {
    console.error("Error sending password reset email", err);
    throw new Error(`Error sending password reset email, ${err}`);
  }
};

const sendResetSuccessEmail = async (email) => {
  const recipient = [{ email }];
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });
    console.log("Password reset success email sent successfully", response);
  } catch (err) {
    console.error("Error sending password reset success email", err);
    throw new Error(`Error sending password reset success email, ${err}`);
  }
};

module.exports = {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendResetSuccessEmail,
};
