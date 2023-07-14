import { z } from 'zod';

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const circlesSchema = {
  createCircles: z
    .object({
      name: z
        .string()
        .min(1, { message: 'nameRequired' })
        .max(10, { message: 'nameMaxLength' })
        .trim(),
      description: z
        .string()
        .min(1, { message: 'descriptionRequired' })
        .max(50, { message: 'descriptionMaxLength' })
        .trim(),
    }),
  inviteCircle: z
    .object({
      invite: z
        .string()
        .email({ message: 'invalidEmail' }),
    }),
  updateCircle: z
    .object({
      name: z
        .string()
        .min(1, { message: 'nameRequired' })
        .max(10, { message: 'nameMaxLength' })
        .trim(),
      description: z
        .string()
        .min(1, { message: 'descriptionRequired' })
        .max(50, { message: 'descriptionMaxLength' })
        .trim(),
    }),
};
