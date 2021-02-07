import NavBar from 'components/navBar';
import Head from 'next/head';
import style from './index.module.scss';

const Page = () => {
  return (
    <>
      <Head>
        <title>Home - Zurnal</title>
      </Head>
      <div id={style.Page}>
        <h1>Home Page</h1>
      </div>
    </>
  );
};
export default Page;
