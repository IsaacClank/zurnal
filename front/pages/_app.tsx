import Head from 'next/head';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import NavBar from 'components/navBar';
import 'style/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </Head>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <div id='App'>
          <NavBar />
          <Component {...pageProps} />
        </div>
      </IconContext.Provider>
    </>
  );
};
export default App;
