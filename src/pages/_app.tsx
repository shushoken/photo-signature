import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
        <Header/>
        <Component {...pageProps} />
        <Footer/>
    </SessionProvider>
  );
}
