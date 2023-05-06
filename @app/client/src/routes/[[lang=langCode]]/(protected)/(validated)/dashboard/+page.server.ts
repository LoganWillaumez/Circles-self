import { circlesSchema } from '$lib/schema/circles.js';
import { validateData } from '$lib/schema/validation';
import { error, fail, redirect } from '@sveltejs/kit';
import API from '../../../../../api/Api.js';
import { isAxiosError } from 'axios';

export async function load(event: any) {
    return {
        user: event.locals.user
    };
}

export const actions = {
  createCircle: async (event) => {
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
},
    signOut: async (event) => {
      event.cookies.delete('accessToken');
      event.cookies.delete('refreshToken');
      event.locals.user = null;
      throw redirect(303, '/home');
    }
};