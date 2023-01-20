import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';
import Timer from './Timer';
import { useCallback } from 'react';

export default function CalendarContainer() {
  const router = useRouter();
  const [storageValue, setStorageValue] = useLocalStorage<string>(
    'inTime_birthDate',
    ''
  );

  const reset = useCallback(() => {
    setStorageValue('');
    router.replace('/');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!storageValue) {
    router.replace('/');
    return null;
  }

  return (
    <>
      <div>
        <Timer birthDate={storageValue} onReset={reset} />
      </div>
    </>
  );
}
