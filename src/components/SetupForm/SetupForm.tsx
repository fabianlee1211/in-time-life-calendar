import {
  format,
  subDays,
  subYears,
  isBefore,
  isSameDay,
  isValid,
  isAfter
} from 'date-fns';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DEFAULT_CONFIG, useConfig } from '@/hooks';
import DatePicker, { CalendarContainer } from 'react-datepicker';
import classNames from 'classnames';
import { schema, type SetupFormValues } from './schema';

export default function SetupForm() {
  const router = useRouter();
  const [_, setConfig] = useConfig();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_CONFIG
  });

  function onSubmit(data: SetupFormValues) {
    setConfig({
      birthDate: format(new Date(data.birthDate), 'yyyy-MM-dd'),
      expectedLifespan: data.expectedLifespan
    });
    router.push('/calendar');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-2xl font-semibold mb-2">Get Started</p>
      <div className="form-control w-full">
        <label className="label" htmlFor="date">
          <span
            className={cn('label-text', { 'text-error': !!errors.birthDate })}
          >
            What's your birth date?
          </span>
        </label>
        <Controller
          control={control}
          name="birthDate"
          render={({ field }) => (
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={field.value ? new Date(field.value) : null}
              placeholderText="Year-Month-Day"
              onChange={(date) => field.onChange(date)}
              customInput={
                <input
                  className={cn('input input-bordered w-full', {
                    'input-error': !!errors.birthDate
                  })}
                />
              }
              calendarContainer={({ className, children }) => {
                return (
                  <CalendarContainer
                    className={classNames(
                      className,
                      'border-zinc-700 border-1 bg-base-100 rounded-md'
                    )}
                  >
                    {children}
                  </CalendarContainer>
                );
              }}
              dayClassName={(date) => {
                const isSelectedDate = isSameDay(date, new Date(field.value));
                return classNames('text-zinc-500 font-medium', {
                  'bg-primary text-white hover:bg-primary/50': isSelectedDate,
                  'hover:bg-zinc-700 bg-base-100': !isSelectedDate
                });
              }}
            />
          )}
        />
        <label className="label">
          {!!errors.birthDate && (
            <span className="label-text-alt text-error">
              {errors.birthDate.message}
            </span>
          )}
        </label>
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="expectedLifespan">
          <span className="label-text">How long do you expect to live?</span>
        </label>
        <label className="input-group">
          <input
            {...register('expectedLifespan')}
            placeholder="Enter your expected lifespan"
            className={cn('input input-bordered w-full', {
              'input-error': !!errors.expectedLifespan
            })}
          />
          <span>Year(s)</span>
        </label>
        <label className="label">
          {!!errors.expectedLifespan && (
            <span className="label-text-alt text-error">
              {errors.expectedLifespan.message}
            </span>
          )}
        </label>
      </div>
      <button type="submit" className="btn btn-primary btn-block mt-4">
        Ready
      </button>
    </form>
  );
}
