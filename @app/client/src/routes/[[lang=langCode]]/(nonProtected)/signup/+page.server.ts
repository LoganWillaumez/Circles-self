import { validateData } from '$lib/schema/validation';
import { isAxiosError } from 'axios';
import { authentification } from '../../../../api/auth/auth';
import type {PageServerLoad} from './$types';
import API from '$lib/utils/Api';
import { error, fail } from '@sveltejs/kit';
import { authenthificationSchema } from '$lib/schema/authentification';

export const load: PageServerLoad = async () => {

};

export const actions = {
  default: async ({request}) => {
    const {formData, errors} = await validateData(
      await request.formData(),
      authenthificationSchema.registerSchema
    );
    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      });
    }
    try {
      const response = await API.post('auth/signup', formData);
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
};
