import {error, fail, type Actions} from '@sveltejs/kit';
import {authenthificationSchema} from '$lib/schema/authentification';
import API from '$lib/utils/Api';
import {validateData} from '$lib/schema/validation';
import {isAxiosError} from 'axios';

export const actions: Actions = {
    default: async ({request}) => {
      const {formData, errors} = await validateData(
        await request.formData(),
        authenthificationSchema.forgotPasswordSchema
      );
      if (errors) {
        return fail(400, {
          data: formData,
          errors: errors.fieldErrors
        });
      }
      try {
        const response = await API.post('auth/forgotpassword', formData);
        return response;
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
}
