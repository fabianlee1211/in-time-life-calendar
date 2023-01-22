import { useLocalStorage } from 'react-use';
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
    </>
  );
}
