import nodemailer from 'nodemailer';
import config from '../config/config.js';

export default class EmailSender {
    static transport = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: config.mailer_user,
            pass: config.mailer_secret
        }
    });

    static sendPassRecoveryEmail(user, token){
        this.transport.sendMail({
            from: `eCommerce Coder <${config.mailer_user}>`,
            to: `${user.email}`,
            subject: 'Password Recovery',
            html: `<h2>Hi ${user.first_name} ${user.last_name},</h2>
            <p>A request to recover your password has been detected. 
                Please follow this link if you want to change your password:
            </p>
            <a href="http://localhost:3000/views/passwordRecovery?token=${token}">
                <button type="button" style="color: white; background-color: DodgerBlue; padding: 10px 5px; 
                    border: 2px solid; border-radius: 10px; cursor: pointer;">
                    Change Password
                </button>
            </a>`
        });
    }

    static sendUserDeletionEmail(user){
        this.transport.sendMail({
            from: `eCommerce Coder <${config.mailer_user}>`,
            to: `${user.email}`,
            subject: 'Account Inactivity',
            html: `<h2>Hi ${user.first_name} ${user.last_name},</h2>
            <p>Your account has been deleted due to inactivity.</p>`
        });
    }

    static sendProductDeletionEmail(user){
        this.transport.sendMail({
            from: `eCommerce Coder <${config.mailer_user}>`,
            to: `${user.email}`,
            subject: 'Product Deleted',
            html: `<h2>Hi ${user.first_name} ${user.last_name},</h2>
            <p>Your PREMIUM product has been deleted.</p>`
        });
    }
}
