import type { CustomerInputDatas } from '@circles-self/circles/interfaces';
import { z } from 'zod';

class CustomZodError extends z.ZodError {
  constructor(issues: z.ZodIssue[]) {
    super(issues);
  }
}

export const passwordSchema = z
  .string()
  .optional()
  .refine(value => {
    if (!value) {
      return true;
    }
    return value.length >= 3 && value.length <= 30;
  }, {
    message: 'passwordLength',
  });

export const customerSchema = {
  update: z
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
      email: z
        .string()
        .min(1, { message: 'emailRequired' })
        .max(64, { message: 'emailMaxLength' })
        .email({ message: 'invalidEmail' }),
      currentPassword: passwordSchema,
      confirmPassword: passwordSchema,
      newPassword: passwordSchema,
      birthdate: z.string().min(1, { message: 'birthdateRequired' }),
    })
    .refine((data: CustomerInputDatas) => {
      const issues: z.ZodIssue[]  = [];

      const passwordFields = ['currentPassword', 'newPassword', 'confirmPassword'];
      const filledPasswordFields = passwordFields.filter(field => data[field as keyof CustomerInputDatas]);

      if (filledPasswordFields.length === 0 || filledPasswordFields.length === 3) {
        if (data.confirmPassword !== data.newPassword) {
          issues.push({ code: 'custom', path: ['confirmPassword'], message: 'passwordNotMatch' });
        }
      } else {
        filledPasswordFields.forEach(field => {
          const fieldValue = data[field as keyof CustomerInputDatas];
          if (fieldValue && (fieldValue.length < 3 || fieldValue.length > 30)) {
            issues.push({ code: 'custom', path: [field], message: 'passwordLength' });
          }
        });

        passwordFields.forEach(field => {
          if (!data[field as keyof CustomerInputDatas]) {
            issues.push({ code: 'custom', path: [field], message: `${field}Required` });
          }
        });
      }

      if (issues.length) {
        throw new CustomZodError(issues);
      }
      return true;
    }, {}),
};
