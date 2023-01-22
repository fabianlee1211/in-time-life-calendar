import AppSkeleton from '@/components/AppSkeleton';
import SEO from '@/components/SEO';
import dynamic from 'next/dynamic';

const TimerCalendar = dynamic(
  () => import('../components/TimerCalendarContainer'),
  {
    ssr: false,
    loading: () => (
      <div className="px-6 lg:px-12 w-full">
        <AppSkeleton />
      </div>
    )
  }
);

export default function Calendar() {
  return (
    <>
      <SEO
        title="Calendar | In Time Life Calendar"
        description="In Time Life Calendar is a simple calendar that helps you visualize your life in terms of time."
      />
      <section className="mx-auto flex flex-1 flex-col items-center justify-center w-full">
        <TimerCalendar />
      </section>
    </>
  );
}
