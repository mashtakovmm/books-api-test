import nodemailer from "nodemailer"

export class Email {
    transporter;
    mailOptions;

    constructor(to: string, token: string) {
        this.transporter = nodemailer.createTransport({
            host: 'mailhog',
            port: 1025,
        });

        const confirmationLink = `http://localhost:8000/users/verify/${token}`;

        this.mailOptions = {
            from: 'noreply@testing.com',
            to: `${to}`,
            subject: 'Confirm Email',
            text: 'Please confirm your email',
            html: `<p>Please confirm your email by clicking <a href="${confirmationLink}">here</a>.</p>`
        };

    }

    async sendMail() {
        await this.transporter.sendMail(this.mailOptions, (error) => {
            if (error) {
                return error;
            }
            return 'Sent:';
        });
        return "outside"
    }
}
