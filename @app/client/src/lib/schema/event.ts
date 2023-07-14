import { z } from 'zod';
import { formatISO } from 'date-fns';

const currentDate = formatISO(new Date());

export const eventSchema = {
  createEvent: z
  .object({
    title: z.string().min(1, { message: 'titleRequired' }),
    description: z.string().min(1, { message: 'descriptionRequired' }),
    allday: z.boolean().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.allday) {
        return true;
      }
      if (!data.allday && data.start) {
        return true;
      }
      return false;
    },
    {
      message: 'startRequired',
      path: ['start'],
    }
  )
  .refine(
    (data) => {
      if (data.allday) {
        return true;
      }
      if (!data.allday && data.end) {
        return true;
      }
      return false;
    },
    {
      message: 'endRequired',
      path: ['end'],
    }
  )
  .refine(
    (data) =>
      !data.start ||
      (data.start && new Date(data.start) > new Date(currentDate)),
    { message: 'invalidStart', path: ['start'] }
  )
  .refine(
    (data) =>
      !data.start ||
      !data.end ||
      (data.start && data.end && new Date(data.end) > new Date(data.start)),
    { message: 'invalidEnd', path: ['end'] }
  ),

  updateEvent: z
  .object({
    title: z.string().min(1, { message: 'titleRequired' }).optional(),
    description: z.string().min(1, { message: 'descriptionRequired' }).optional(),
    allday: z.boolean().optional(),
    start: z.string().optional(),
    end: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.allday === undefined || data.allday) {
        return true;
      }
      if (data.allday === false && data.start !== undefined) {
        return true;
      }
      return false;
    },
    {
      message: 'startRequired',
      path: ['start'],
    }
  )
  .refine(
    (data) => {
      if (data.allday === undefined || data.allday) {
        return true;
      }
      if (data.allday === false && data.end !== undefined) {
        return true;
      }
      return false;
    },
    {
      message: 'endRequired',
      path: ['end'],
    }
  )
  .refine(
    (data) =>
      data.start === undefined ||
      (data.start && new Date(data.start) > new Date(currentDate)),
    { message: 'invalidStart', path: ['start'] }
  )
  .refine(
    (data) =>
      data.start === undefined ||
      data.end === undefined ||
      (data.start && data.end && new Date(data.end) > new Date(data.start)),
    { message: 'invalidEnd', path: ['end'] }
  ),
}
