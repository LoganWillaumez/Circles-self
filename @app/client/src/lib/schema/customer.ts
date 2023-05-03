import { z } from 'zod';

class CustomZodError extends z.ZodError {
  constructor(issues) {
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
    message: 'Must be between 3 and 30 characters',
  });

export const customerSchema = {
  update: z
    .object({
      firstname: z
        .string()
        .min(1, { message: 'Required' })
        .max(20, { message: 'Must be less than 20 characters' })
        .trim(),
      lastname: z
        .string()
        .min(1, { message: 'Required' })
        .max(20, { message: 'Must be less than 20 characters' })
        .trim(),
      email: z
        .string()
        .min(1, { message: 'Required' })
        .max(64, { message: 'Must be less than 64 characters' })
        .email({ message: 'Must be a valid email address' }),
      currentpassword: passwordSchema,
      confirmpassword: passwordSchema,
      newpassword: passwordSchema,
      birthdate: z.string().min(1, { message: 'Required' }),
    })
    .refine(data => {
      const issues = [];

      const passwordFields = ['currentpassword', 'newpassword', 'confirmpassword'];
      const filledPasswordFields = passwordFields.filter(field => data[field]);

      if (filledPasswordFields.length === 0 || filledPasswordFields.length === 3) {
        if (data.confirmpassword !== data.newpassword) {
          issues.push({ path: ['confirmpassword'], message: 'passwordNotMatch' });
        }
      } else {
        filledPasswordFields.forEach(field => {
          if (data[field].length < 3 || data[field].length > 30) {
            issues.push({ path: [field], message: 'Must be between 3 and 30 characters' });
          }
        });

        passwordFields.forEach(field => {
          if (!data[field]) {
            issues.push({ path: [field], message: `${field}Required` });
          }
        });
      }

      if (issues.length) {
        throw new CustomZodError(issues);
      }
      return true;
    }, {}),
};
