import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const telegramSend = async (message: string) => {
    const response = fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${process.env.TELEGRAM_CHAT_ID}&text=${encodeURIComponent(message)}&parse_mode=HTML`, {
        method: 'POST'
    });
    const data = await response;
    if (!data.ok) {
        console.log('Error sending message to Telegram:', data.statusText);
        throw new Error('Failed to send message to Telegram');
    }
    return data;
}

export const emailResetSend = async (email: string, token: string) => {
    const resetLink = `${process.env.ORIGIN}/reset/${token}`;
    await resend.emails.send({
        from: 'theravickya <us@theravickya.com>',
        to: email,
        subject: 'Reset Password',
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
                <h2 style="color: #007BFF; margin-bottom: 20px;">Reset Password</h2>

                <p style="margin-bottom: 15px;">
                    You have requested to reset your password. Click the button below to proceed.
                </p>

                <div style="text-align: center; margin-bottom: 10px;">
                    <a href="${resetLink}" style="padding: 12px 24px; background-color: #007BFF; color: #fff; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Reset Password
                    </a>
                </div>

                <p style="font-size: 14px; color: #777; text-align: center; margin-bottom: 30px;">
                    Or copy and paste this link: <br>
                    <a href="${resetLink}" style="color: #007BFF;">${resetLink}</a>
                </p>

                <p style="margin-bottom: 30px;">
                    If you didn't request this, you can safely ignore this email.
                </p>

                <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;">


                <p style="margin-bottom: 15px;">
                    Anda telah meminta untuk mengatur ulang kata sandi Anda. Klik tombol di atas untuk melanjutkan.
                </p>

                <p style="font-size: 14px; color: #777; margin-bottom: 30px;">
                    Atau salin dan tempel tautan ini: <br>
                    <a href="${resetLink}" style="color: #007BFF;">${resetLink}</a>
                </p>

                <p>
                    Jika Anda tidak merasa meminta ini, Anda dapat mengabaikan email ini dengan aman.
                </p>

                <p style="font-size: 14px; color: #777; margin-top: 40px;">
                    Thank you / Terima kasih,<br>
                    <strong>theravickya</strong>
                </p>
            </div>
        </div>
        `,
    });
};


export const TestEmail = async (email: string) => {
    await resend.emails.send({
        from: 'theravickya <us@theravickya.com>',
        to: email,
        subject: 'Reset Password',
        html: `
        <div style="font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">
            <h2 style="color: #333;">Reset Password</h2>
            <p style="color: #555;">
                You have requested to reset your password. Please click the link below to reset it:
            </p>
            <p style="color: #555;">
                Thank you,<br>
                theravickya
            </p>
        </div>
    `,
    });
}