import { z } from 'zod';

export const authenthificationSchema = {
  registerSchema: z
    .object({
      firstname: z
        .string()
        .min(1, { message: 'firstnameRequired' })
        .max(20, { message: 'firstnameMaxLength' })
        .trim(),
      lastname: z
        .string()
        .min(1, { message: 'lastnameRequired' })
        .max(20, { message: 'lastnameMaxLength' })
        .trim(),
      password: z
        .string()
        .min(3, { message: 'passwordMinLength' })
        .max(30, { message: 'passwordMaxLength' })
        .trim(),
      gender: z.string().min(1, { message: 'genderRequired' }).trim(),
      confirmPassword: z
        .string()
        .min(3, { message: 'confirmPasswordMinLength' })
        .max(30, { message: 'confirmPasswordMaxLength' })
        .trim(),
      email: z
        .string()
        .min(1, { message: 'emailRequired' })
        .max(64, { message: 'emailMaxLength' })
        .email({ message: 'invalidEmail' }),
      birthdate: z.string().min(1, { message: 'birthdateRequired' })
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
      if (confirmPassword !== password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'passwordsMustMatch',
          path: ['password']
        });
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'passwordsMustMatch',
          path: ['confirmPassword']
        });
      }
    }),
  loginSchema: z.object({
    email: z
      .string()
      .min(1, { message: 'emailRequired' })
      .max(64, { message: 'emailMaxLength' })
      .email({ message: 'invalidEmail' }),
    password: z
      .string()
      .min(3, { message: 'passwordMinLength' })
      .max(30, { message: 'passwordMaxLength' })
      .trim()
  }),
  forgotPasswordSchema: z.object({
    email: z
      .string()
      .min(1, { message: 'emailRequired' })
      .max(64, { message: 'emailMaxLength' })
      .email({ message: 'invalidEmail' })
  }),
  passwordResetSchema : z.object({
    newPassword: z
      .string()
      .min(3, { message: 'newPasswordMinLength' })
      .max(30, { message: 'newPasswordMaxLength' }),
      randomCode: z.string().min(1, { message: 'randomCodeRequired' }),
    confirmNewPassword: z
      .string()
      .min(3, { message: 'confirmNewPasswordMinLength' })
      .max(30, { message: 'confirmNewPasswordMaxLength' }),
  }).superRefine((data, ctx) => {
    if (data.newPassword !== data.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'passwordsMustMatch',
        path: ['confirmNewPassword'],
      });
    }
  })
};
