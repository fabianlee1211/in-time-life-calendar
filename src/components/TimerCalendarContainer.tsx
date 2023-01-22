import { useRouter } from 'next/router';
import Timer from './Timer';
import { useCallback } from 'react';
import Calendar from './Calendar';
import { useConfig } from '@/hooks';

export default function TimerCalendarContainer() {
  const router = useRouter();
  const [config, _, remove] = useConfig();

  const reset = useCallback(() => {
    remove();
    router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!config?.birthDate) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <Timer {...config} onReset={reset} />
      <Calendar {...config} />
      <div className="max-w-2xl px-6 md:px-12 self-start text-xs opacity-30 mx-auto text-center">
        <p className="font-medium">Disclaimer</p>
        <p className="mt-2">
          The calendar assumes every year has 52 weeks (7 x 52 = 364 Days) for
          the ease of calculation. In reality we are missing approximately 1 day
          in common years and 2 days in leap years. The purpose of this calendar
          is not about 100% accuracy but to help you visualize your lifetime.
        </p>
      </div>
    </>
  );
}
