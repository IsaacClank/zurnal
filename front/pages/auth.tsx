import Head from 'next/head';
import { FormEvent, useCallback, useState } from 'react';
import style from './auth.module.scss';

const AuthForm = () => {
  const [email, setEmail] = useState('');

  const submitHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      console.log(email);
    },
    [email]
  );

  return (
    <>
      <Head>
        <title>Signin - Zurnal</title>
      </Head>
      <div id={style.AuthWrapper}>
        <form onSubmit={submitHandler}>
          <h1>Sign in with email</h1>
          <div id={style.Email}>
            <input value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div id={style.SubmitButton}>
            <input type='submit' value='Sign in' />
          </div>
        </form>
      </div>
    </>
  );
};

export default AuthForm;
