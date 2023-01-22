import * as Fathom from 'fathom-client';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === 'production';

const useFathom = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isProduction) return;

    if (process.env.NEXT_PUBLIC_FATHOM_CLIENT_ID) {
      Fathom.load(process.env.NEXT_PUBLIC_FATHOM_CLIENT_ID, {
        includedDomains: [
          'in-time-life-calendar.com',
          'www.in-time-life-calendar.com'
        ]
      });
    }

    const handleRouteChange = () => {
      Fathom.trackPageview();
    };

    if (isProduction) {
      router.events.on('routeChangeComplete', handleRouteChange);
    }

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);
};

export default useFathom;
