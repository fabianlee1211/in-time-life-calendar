import AppSkeleton from '@/components/AppSkeleton';
import SEO from '@/components/SEO';
import dynamic from 'next/dynamic';

const TimerCalendar = dynamic(
  () => import('../components/TimerCalendarContainer'),
  {
    ssr: false,
    loading: () => <AppSkeleton />
  }
);

export default function Calendar() {
  return (
    <>
      <SEO
        title="Calendar | In Time Life Calendar"
        description="In Time Life Calendar is a simple calendar that helps you visualize your life in terms of time."
      />
      <section className="max-w-screen-2xl px-6 lg:px-12 mx-auto flex flex-1 flex-col items-center justify-center w-full">
        <TimerCalendar />
      </section>
    </>
  );
}
