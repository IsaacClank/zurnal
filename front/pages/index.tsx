import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import { useQuery } from 'react-query';

import { APIAddr } from 'config';
import { PlainObject } from 'lib/type';
import { reqGet } from 'lib/utils';
import style from './index.module.scss';

const JournalList = () => {
  const { data, status } = useQuery<{ journals: PlainObject[] }>('journals', () =>
    reqGet(`${APIAddr}/journal`)
  );

  if (status === 'loading') return null;

  return <div>{data.journals.length === 0 ? 'No journal yet' : 'Loaded'}</div>;
};

const Page = () => {
  const router = useRouter();
  const auth = useQuery<{ isAuthenticated: boolean }>('auth');

  if (auth.status !== 'success') return null;
  else if (!auth.data.isAuthenticated) {
    router.replace('/auth');
    return null;
  } else
    return (
      <>
        <Head>
          <title>Home - Zurnal</title>
        </Head>
        <div id={style.Page}>
          <h1>Your journals</h1>
          <hr />
          <JournalList />
        </div>
      </>
    );
};
export default Page;
