import Layout from '@/components/Layout';
import type { AppProps } from 'next/app';
import useFathom from '@/useFathom';
import 'react-datepicker/dist/react-datepicker.css';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  useFathom();

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
