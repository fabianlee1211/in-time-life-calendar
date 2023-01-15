import { useLocalStorage } from 'react-use';
import BirthDateForm from './BirthDateForm';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AppContainer() {
  const router = useRouter();
  const [storageValue] = useLocalStorage<string>('inTime_birthDate', '');

  if (storageValue) {
    router.replace('/calendar');
    return null;
  }

  return (
    <>
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-7 lg:col-span-8 space-y-4 self-center max-w-2xl">
          <h1 className="text-6xl font-bold text-gray-100">
            Realize the value of every moment
          </h1>
          <p className="text-xl text-gray-500">
            <span className="font-semibold text-primary">
              In Time Life Calendar
            </span>{' '}
            helps you visualize the potential time you have left, and nudges you
            to make it count.
          </p>
          <Link className="btn btn-outline btn-primary" href="/about">
            Learn More
          </Link>
        </div>
        <div className="md:col-span-5 lg:col-span-4 p-6 bg-zinc-800 border-zinc-700 border-[1px] rounded-lg">
          <BirthDateForm />
        </div>
      </div>
    </>
  );
}
