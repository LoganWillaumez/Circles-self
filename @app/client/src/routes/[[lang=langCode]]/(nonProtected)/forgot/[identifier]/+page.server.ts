import {error, fail, redirect} from '@sveltejs/kit';
import API from "$lib/utils/Api";
import { validateData } from '$lib/schema/validation';
import { isAxiosError } from 'axios';
import { authenthificationSchema } from '$lib/schema/authentification';

export const load = async ({params, url, cookies}) => {
  let search = url.search;
  search = search.substring(1);
  const pairs = search.split('&');
  const randomCodePair = pairs.find(pair => pair.startsWith('randomCode='));
  
  if(!randomCodePair) {
    return {props: {message: 'Invalid URL'}};
  }
  
  const randomCode = randomCodePair.replace('randomCode=', '');
  
  const {identifier} = params;
  
  try {
    const response: any = await API.post(`auth/forgot/${identifier}`, { randomCode: randomCode }, cookies);
    return {message: 'Verification successful', randomCode: randomCode};
  } catch(err) {
    if (isAxiosError(err)) {
        switch (err.response?.status) {
            case 400:
            case 403:
                return {message: err.response.data.message, error : true};
            default:
                return error(500);
        }
    }
    return error(500);
  }
};



export const actions = {
  default: async ({request}) => {
    const {formData, errors} = await validateData(
      await request.formData(),
      authenthificationSchema.passwordResetSchema
    );
    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      });
    }
    try {
      const response = await API.post('auth/password-reset', formData);
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
