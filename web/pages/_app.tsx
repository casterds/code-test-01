import type { AppProps } from "next/app";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { NextSeo } from "next-seo";
import theme from "utils/theme";
import Head from "next/head";
import { useInitializeMetamask } from "store/metamask";
import { useInitializeAccount } from "store/account";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Do not continuously fetch requests.
      staleTime: Infinity,
    },
  },
});

export default function MyApp({ Component, pageProps }: AppProps) {
  useInitializeMetamask();
  useInitializeAccount();

  return (
    <>
      <NextSeo
        title="Gift NFT Cards"
        description="Gift your loves ones this holiday season NFT Gift cards which wrap in crypto goodies inside."
      />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}
