import {z} from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const circlesSchema = {
  createCircles: z
    .object({
      name: z
        .string()
        .min(1, {message: 'Required'})
        .max(10, {message: 'Must be less than 10 characters'})
        .trim(),
      description: z
        .string()
        .min(1, {message: 'Required'})
        .max(50, {message: 'Must be less than 50 characters'})
        .trim(),
    }),
  inviteCircle: z
    .object({
      invite: z
        .string()
        .email({message: 'Invalid email address'}),
    }),
};
