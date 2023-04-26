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
        // img: z.object({
        //     profileImage: z
        //       .any()
        //     //   .refine((files) => files?.length == 1, "Image is required.")
        //       .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `image.tooBig`)
        //       .refine(
        //         (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
        //         "image.badFormat"
        //       ),
        //   })
    })
};
