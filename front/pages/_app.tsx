import Head from 'next/head';
import { AppProps } from 'next/app';
import 'style/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <div id='App'>
        <Component {...pageProps} />
      </div>
    </>
  );
};
export default App;
