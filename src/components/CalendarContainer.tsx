import { useLocalStorage } from 'react-use';
import { useRouter } from 'next/router';

export default function CalendarContainer() {
  const router = useRouter();
  const [storageValue] = useLocalStorage<string>('inTime_birthDate', '');

  if (!storageValue) {
    router.replace('/');
    return null;
  }

  return <h1>{storageValue}</h1>;
}
