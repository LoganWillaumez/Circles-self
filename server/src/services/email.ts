import nodemailer from 'nodemailer';
import mjml2html from 'mjml';
import fs from 'fs';

export interface MailOptions {
    to: string;
    subject: string;
    template: string;
    context: any;
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendMail(options: MailOptions) {
  const mjml = fs.readFileSync(`./views/emails/${options.template}.mjml`, 'utf-8');
  const { html } = mjml2html(mjml);

  const mailOptions = {
    from: process.env.SMTP_FROM_EMAIL,
    to: options.to,
    subject: options.subject,
    html,
  };

  await transporter.sendMail(mailOptions);
}
