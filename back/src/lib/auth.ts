import { v4 } from 'uuid';
import { nanoid } from 'nanoid';
import { DatabaseClient } from './database';
import RedisClient from './redisClient';
import MailTransportClient from './mail';
import { corsOrigin, sendgridSender } from '../config';
import { ErrorObject } from './type';
import { promisify } from 'util';

export const waitVerify = (email: string, done: (error?: ErrorObject, id?: string) => void) => {
  const redisClient = RedisClient();
  const id = nanoid();
  redisClient.set(`verify-${email}`, id);

  MailTransportClient.sendMail(
    {
      from: sendgridSender,
      to: `${email}`,
      subject: 'verify',
      text: 'Waiting for verification',
      html: `<a href='${corsOrigin}/auth/${id}'>Verify</a>`,
    },
    err => {
      if (err)
        done({
          status: 500,
          error: 'Failed to send verication email',
          detail: err,
        });
      else done(undefined, id);
    }
  );
};

export const signin = async (email: string, id: string) => {
  const redis = RedisClient();
  const getAsync = promisify(redis.get).bind(redis);
  const db = DatabaseClient();

  return (
    getAsync(`verify-${email}`)
      // Validate verification code
      .then(result =>
        result !== id
          ? Promise.reject({
              error: 'Failed to authenticate.',
              detail: Error('Verification code has expired.'),
              status: 400,
            } as ErrorObject)
          : result
      )
      // Remove verification entry
      .then(_ => {
        redis.del(`verify-${email}`);
      })
      // Authenticate user
      // Create new user account with email if it doesn't exist
      .then(() =>
        db.user.findUnique({
          where: {
            email,
          },
          select: {
            username: true,
            email: true,
          },
        })
      )
      .then(u =>
        u?.email
          ? u
          : db.user.create({
              data: {
                account_id: v4(),
                email,
              },
            })
      )
  );
};
