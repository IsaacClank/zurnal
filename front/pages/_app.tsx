import Head from 'next/head';
import { AppProps } from 'next/app';
import { IconContext } from 'react-icons';
import { QueryClientProvider, QueryClient } from 'react-query';

import NavBar from 'components/navBar';
import 'style/global.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
        <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#5bbad5' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      <QueryClientProvider client={new QueryClient()}>
        <IconContext.Provider value={{ className: 'react-icons' }}>
          <div id='App'>
            <NavBar />
            <Component {...pageProps} />
          </div>
        </IconContext.Provider>
      </QueryClientProvider>
    </>
  );
};
export default App;
