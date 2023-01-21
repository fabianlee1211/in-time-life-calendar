import Head from 'next/head';
import dynamic from 'next/dynamic';
import AppSkeleton from '@/components/AppSkeleton';

const App = dynamic(() => import('../components/AppContainer'), {
  ssr: false,
  loading: () => <AppSkeleton />
});

export default function Home() {
  return (
    <>
      <Head>
        <title>In Time Life Calendar</title>
        <meta
          name="description"
          content="Visualize your remaining time of your life with the In Time Life Calendar. Make the most of every moment and never let another one slip away."
        />
      </Head>
      <section className="max-w-screen-2xl px-6 lg:px-12 mx-auto w-full flex-1 flex flex-col items-center justify-center">
        <App />
      </section>
    </>
  );
}
