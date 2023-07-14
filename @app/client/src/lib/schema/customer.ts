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
      currentpassword: passwordSchema,
      confirmpassword: passwordSchema,
      newpassword: passwordSchema,
      birthdate: z.string().min(1, { message: 'birthdateRequired' }),
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
            issues.push({ path: [field], message: 'passwordLength' });
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
