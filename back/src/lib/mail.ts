import { createTransport } from 'nodemailer';
import { sendgridHost, sendgridKey, sendgridPort, sendgridUser } from '../config';

export const MailTransportClient = createTransport({
  host: sendgridHost,
  port: Number(sendgridPort || 465),
  pool: true,
  auth: {
    user: sendgridUser,
    pass: sendgridKey,
  },
});
