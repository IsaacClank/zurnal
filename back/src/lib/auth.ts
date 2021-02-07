import { v4 } from 'uuid';
import { nanoid } from 'nanoid';
import { DatabaseClient } from './database';
import RedisClient from './redisClient';
import MailTransportClient from './mail';
import { corsOrigin, sendgridSender } from '../config';

export const waitVerify = (email: string) => {
  const redis = RedisClient();
  const verifyId = nanoid();
  redis.set(`verify-${email}`, verifyId);
  MailTransportClient.sendMail({
    from: sendgridSender,
    to: `${email}`,
    subject: 'verify',
    text: 'Waiting for verification',
    html: `<a href='${corsOrigin}/api/auth/verify?id=${verifyId}'>Verify</a>`,
  });
  return verifyId;
};

export const signin = async (email: string, verifyId: string) => {
  console.log(email);
  console.log(verifyId);
  const db = DatabaseClient();
  // Check if user exist in database
  return db.user
    .findUnique({
      where: {
        email: email,
      },
    })
    .then(u =>
      u?.account_id
        ? u
        : db.user.create({
            select: {
              email: true,
            },
            data: {
              account_id: v4(),
              email: email,
            },
          })
    );
};
