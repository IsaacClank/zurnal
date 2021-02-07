import Head from 'next/head';
import { useRouter } from 'next/dist/client/router';
import { FormEvent, useCallback, useState } from 'react';

import { APIAddr } from 'config';
import { reqPost } from 'lib/utils';
import style from './index.module.scss';

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [isVerifying, setVerificationStatus] = useState(false);
  const router = useRouter();

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      reqPost({ email }, `${APIAddr}/auth/request`).then(_ => {
        setVerificationStatus(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      });
    },
    [email, router]
  );

  return (
    <>
      <Head>
        <title>Signin - Zurnal</title>
      </Head>
      <div id={style.AuthWrapper}>
        <form onSubmit={submitHandler}>
          {!isVerifying ? (
            <>
              <h1>Sign in with email</h1>
              <div id={style.Email}>
                <input type='email' value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div id={style.SubmitButton}>
                <input type='submit' value='Sign in' />
              </div>
            </>
          ) : (
            <div>Check your email for verification</div>
          )}
        </form>
      </div>
    </>
  );
};

export default AuthForm;
