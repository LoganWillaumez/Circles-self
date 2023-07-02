import { z } from 'zod';
import { formatISO } from 'date-fns';

const currentDate = formatISO(new Date());

export const eventSchema = {
  createEvent: z
  .object({
    title: z.string().min(1, { message: 'Required' }),
    description: z.string().min(1, { message: 'Required' }),
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
      message: 'Start is required if allday is false or not provided',
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
      message: 'End is required if allday is false or not provided',
      path: ['end'],
    }
  )
  .refine(
    (data) =>
      !data.start ||
      (data.start && new Date(data.start) > new Date(currentDate)),
    { message: 'Start must be after the current date', path: ['start'] }
  )
  .refine(
    (data) =>
      !data.start ||
      !data.end ||
      (data.start && data.end && new Date(data.end) > new Date(data.start)),
    { message: 'End must be after start', path: ['end'] }
  ),

  updateEvent: z
  .object({
    title: z.string().min(1, { message: 'Required' }).optional(),
    description: z.string().min(1, { message: 'Required' }).optional(),
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
      message: 'Start is required if allday is false',
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
      message: 'End is required if allday is false',
      path: ['end'],
    }
  )
  .refine(
    (data) =>
      data.start === undefined ||
      (data.start && new Date(data.start) > new Date(currentDate)),
    { message: 'Start must be after the current date', path: ['start'] }
  )
  .refine(
    (data) =>
      data.start === undefined ||
      data.end === undefined ||
      (data.start && data.end && new Date(data.end) > new Date(data.start)),
    { message: 'End must be after start', path: ['end'] }
  ),
}
