export const validateData = async (formData: any, schema: any) => {
  const body = Object.fromEntries(await formData);

  try {
    const dataCheck = schema.parse(body);
    return {
      formData: dataCheck,
      errors: null
    };
  } catch (err: any) {
    const errors = err.flatten();
    return {
      formData: body,
      errors
    };
  }
};
