import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import Head from 'next/head';

const queryClient = new QueryClient();

import theme from '../theme';
import { store } from '../store/store';
import { Fonts } from '../fonts';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Sing & Share</title>
        <link rel='icon' href='/favicon.png' type='image/png' />
      </Head>

      <Provider store={store}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: true,
            }}
          >
            <QueryClientProvider client={queryClient}>
              <Component {...pageProps} />
              <ReactQueryDevtools />
            </QueryClientProvider>
          </ColorModeProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}

export default MyApp;
