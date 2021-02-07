import { createTransport } from 'nodemailer';
import { sendgridHost, sendgridKey, sendgridPort, sendgridSender, sendgridUser } from '../config';

const MailTransportClient = createTransport({
  host: sendgridHost,
  port: Number(sendgridPort || 465),
  pool: true,
  auth: {
    user: sendgridUser,
    pass: sendgridKey,
  },
});

MailTransportClient.on('error', err => {
  console.log(err);
});

// MailTransportClient.sendMail({
//   from: sendgridSender,
//   to: '17521132@gm.uit.edu.vn',
//   text: 'Hello',
// });

export default MailTransportClient;
