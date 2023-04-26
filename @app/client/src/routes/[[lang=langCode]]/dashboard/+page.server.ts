import { circlesSchema } from '$lib/schema/circles.js';
import { validateData } from '$lib/schema/validation';
import { error, fail } from '@sveltejs/kit';
import API from '../../../api/Api.js';
import { isAxiosError } from 'axios';

export async function load(event: any) {
  const customer = await API.get('customer',undefined, event.cookies);
  event.locals.user = customer.data;
    console.log('🚀 ~ event.locals.user:', event.locals.user);
    return {
        user: customer.data
    };
}

export const actions = {
  default: async (event) => {
    const {formData, errors} = await validateData(
        await event.request.formData(),
        circlesSchema.createCircles
      );
      if (errors) {
        return fail(400, {
          data: formData,
          errors: errors.fieldErrors
        });
      }

      try {
        const response = await API.post('circles', formData, event.cookies);
        if(response.status === 201){
          return response;
        }
      } catch (err) {
        if (isAxiosError(err)) {
          if (err.response) {
            return fail(err.response.status, {
              message: err.response.data.message
            });
          } else {
            return error(500);
          }
        } else {
          return error(500);
        }
      }
}
};