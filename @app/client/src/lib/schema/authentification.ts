import {z} from 'zod';

class CustomZodError extends z.ZodError {
  constructor(issues) {
    super(issues);
  }
}

export const authenthificationSchema = {
  registerSchema: z
    .object({
      firstname: z
        .string()
        .min(1, {message: 'Required'})
        .max(20, {message: 'Must be less than 20 characters'})
        .trim(),
      lastname: z
        .string()
        .min(1, {message: 'Required'})
        .max(20, {message: 'Must be less than 20 characters'})
        .trim(),
      password: z
        .string()
        .min(3, {message: 'Must be more than than 2 characters'})
        // .regex(/^[a-zA-Z0-9]/,{ message: 'Must be a valid password' })
        .max(30, {message: 'Must be less than 30 characters'})
        .trim(),
      gender: z.string().min(1, {message: 'Required'}).trim(),
      confirmPassword: z
        .string()
        .min(3, {message: 'Must be more than than 2 characters'})
        // .regex(/^[a-zA-Z0-9]/,{ message: 'Must be a valid password' })
        .max(30, {message: 'Must be less than 30 characters'})
        .trim(),
      email: z
        .string()
        .min(1, {message: 'Required'})
        .max(64, {message: 'Must be less than 64 characters'})
        .email({message: 'Must be a valid email address'}),
      birthdate: z.string().min(1, {message: 'Required'})
    })
    .superRefine(({confirmPassword, password}, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'The passwords did not match',
          path: ['password']
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'The passwords did not match',
          path: ['confirmPassword']
        });
      }
    }),
  loginSchema: z.object({
    email: z
      .string()
      .min(1, {message: 'Required'})
      .max(64, {message: 'Must be less than 64 characters'})
      .email({message: 'Must be a valid email address'}),
    password: z
      .string()
      .min(3, {message: 'Must be more than than 2 characters'})
      .max(30, {message: 'Must be less than 30 characters'})
      .trim()
  }),
  forgotPasswordSchema: z.object({
    email: z
      .string()
      .min(1, {message: 'Required'})
      .max(64, {message: 'Must be less than 64 characters'})
      .email({message: 'Must be a valid email address'})
  }),
  passwordResetSchema : z.object({
    newPassword: z
      .string()
      .min(3, { message: 'Password must be at least 3 characters' })
      .max(30, { message: 'Password must be no more than 30 characters' }),
      randomCode: z.string().min(1, {message: 'Required'}),
    confirmNewPassword: z
      .string()
      .min(3, { message: 'Password must be at least 3 characters' })
      .max(30, { message: 'Password must be no more than 30 characters' }),
  }).refine(data => {
    if (data.newPassword !== data.confirmNewPassword) {
      throw new CustomZodError([
        {
          path: ['confirmNewPassword'],
          message: 'Passwords do not match',
        },
      ]);
    }
    return true;
  })
};
