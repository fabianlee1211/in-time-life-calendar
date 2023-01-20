import { format, subDays, subYears, isBefore, isAfter } from 'date-fns';
import { useState } from 'react';
import { useLocalStorage } from 'react-use';
import cn from 'classnames';
import { useRouter } from 'next/router';

const now = new Date();
const maxDate = subDays(now, 1);
const minDate = subYears(now, 81);

export default function BirthDateForm() {
  const router = useRouter();
  const [_, setStorageValue] = useLocalStorage<string>('inTime_birthDate', '');
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  function handleSubmit() {
    if (
      !value ||
      isBefore(new Date(value), minDate) ||
      isAfter(new Date(value), maxDate)
    ) {
      setError(true);
    } else {
      setError(false);
      setStorageValue(value);
      router.push('/calendar');
    }
  }

  return (
    <>
      <div className="form-control w-full">
        <p className="text-2xl font-semibold mb-2">Get Started</p>
        <label className="label" htmlFor="date">
          <span className={cn('label-text', { 'text-error': error })}>
            What's your birth date?
          </span>
        </label>
        <input
          id="date"
          type="date"
          placeholder="Enter your birth date"
          className={cn('input input-bordered w-full', {
            'input-error': error
          })}
          max={format(maxDate, 'yyyy-MM-dd')}
          min={format(minDate, 'yyyy-MM-dd')}
          required
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <label className="label">
          {error && (
            <span className="label-text-alt text-error">
              Please enter a valid birth date.
            </span>
          )}
        </label>
      </div>
      <button className="btn btn-primary btn-block mt-4" onClick={handleSubmit}>
        Submit
      </button>
    </>
  );
}
