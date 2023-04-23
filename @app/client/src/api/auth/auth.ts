import {error, fail, type Actions} from '@sveltejs/kit';
import {authenthificationSchema} from '$lib/schema/authentification';
import API from '../Api';
import {validateData} from '$lib/schema/validation';
import {isAxiosError} from 'axios';
import { setAuthToken } from '@circles-self/circles/utils';
import { TokenType } from '@circles-self/circles/enums';

export const authentification: Actions = {
  signup: async ({request}) => {
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
  },
  signin: async ({cookies, request}) => {
    const {formData, errors} = await validateData(
      await request.formData(),
      authenthificationSchema.loginSchema
    );
    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      });
    }
    try {
      const response = await API.post('auth/signin', formData);
      if(response.data.refreshToken){
        setAuthToken(TokenType.REFRESHTOKEN, cookies, response.data.refreshToken);
        const responseWithoutToken = {...response.data};
        delete responseWithoutToken.refreshToken;
        return {
          ...response,
          ...responseWithoutToken
        };;
      }
    } catch (err) { 
      if (isAxiosError(err)) {
        if (err.response) {
          return fail(err.response.status, {
            message: err.response.data.message
          });
        } else {
          return fail(500);
        }
      } else {
        return fail(500);
      }
    }
  },
  
  activate: async (identifier: string) => {
    try {
      const isActivate = await API.post('auth/activate', {identifier});
      return isActivate;
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
