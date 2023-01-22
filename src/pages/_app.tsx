import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import { Analytics } from '@vercel/analytics/react';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Analytics />
    </Layout>
  );
}
