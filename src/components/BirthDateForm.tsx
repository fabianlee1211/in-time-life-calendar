import { format, subDays, subYears, isBefore, isAfter } from 'date-fns';
import cn from 'classnames';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DEFAULT_CONFIG, useConfig } from '@/hooks';

const schema = z
  .object({
    birthDate: z.coerce
      .date({
        errorMap: () => {
          return {
            message: 'Please enter a valid date.'
          };
        }
      })
      .max(subDays(new Date(), 1), "You can't be born in the future.")
      .transform((val) => String(val)),
    expectedLifespan: z.coerce.number().min(1).max(100)
  })
  .required()
  .superRefine((val, ctx) => {
    if (
      isBefore(
        new Date(val.birthDate),
        subYears(new Date(), val.expectedLifespan + 1)
      )
    ) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Your expected lifespan is longer than your age.`,
        path: ['expectedLifespan']
      });
    }
  });

type FormValues = z.infer<typeof schema>;

export default function BirthDateForm() {
  const router = useRouter();
  const [_, setConfig] = useConfig();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: DEFAULT_CONFIG
  });

  function onSubmit(data: FormValues) {
    setConfig({
      birthDate: format(new Date(data.birthDate), 'yyyy-MM-dd'),
      expectedLifespan: data.expectedLifespan
    });
    router.push('/calendar');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-control w-full">
        <p className="text-2xl font-semibold mb-2">Get Started</p>
        <div className="form-control">
          <label className="label" htmlFor="date">
            <span
              className={cn('label-text', { 'text-error': !!errors.birthDate })}
            >
              What's your birth date?
            </span>
          </label>
          <input
            type="date"
            {...register('birthDate')}
            placeholder="Enter your birth date"
            className={cn('input input-bordered w-full', {
              'input-error': !!errors.birthDate
            })}
          />
          <label className="label">
            {!!errors.birthDate && (
              <span className="label-text-alt text-error">
                {errors.birthDate.message}
              </span>
            )}
          </label>
        </div>
      </div>
      <div>
        <label className="label">
          <span className="label-text">Expected lifespan</span>
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
        Submit
      </button>
    </form>
  );
}
