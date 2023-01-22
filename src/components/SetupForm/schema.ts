import { z } from 'zod';
import { format, subYears, isBefore, isValid, isAfter } from 'date-fns';

export const schema = z
  .object({
    birthDate: z.coerce.string(),
    expectedLifespan: z.coerce
      .number()
      .min(1, { message: 'You will probably live longer than that.' })
      .max(120, {
        message:
          'Like your optimism but human beings are unlikely to live that long.'
      })
      .int('Please enter a whole number.')
  })
  .required()
  .superRefine((val, ctx) => {
    if (!isValid(new Date(val.birthDate))) {
      return ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: 'Please enter a valid date.',
        path: ['birthDate']
      });
    }

    if (
      isAfter(
        new Date(val.birthDate),
        new Date(format(new Date(), 'yyyy-MM-dd'))
      )
    ) {
      return ctx.addIssue({
        code: z.ZodIssueCode.invalid_date,
        message: `You can't be born in the future.`,
        path: ['birthDate']
      });
    }

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

export type SetupFormValues = z.infer<typeof schema>;
