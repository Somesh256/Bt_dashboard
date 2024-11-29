const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

async function sendOTPEmail(email, otp) {
    try {
        const msg = {
            to: email,
            from: 'someshkumarmeena@outlook.com',
            subject: 'Email Verification OTP',
            text: `Your OTP for email verification is: ${otp}`,
            cc: 'ddmahadev@gmail.com',
            bcc: 'abc@gmail.com'
        };
        await sgMail.send(msg);
        return true
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

module.exports = { sendOTPEmail, generateOTP };
