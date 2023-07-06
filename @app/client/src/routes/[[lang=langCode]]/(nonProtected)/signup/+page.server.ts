import { validateData } from '$lib/schema/validation';
import { isAxiosError } from 'axios';
import { authentification } from '../../../../api/auth/auth';
import type {PageServerLoad} from './$types';
import API from '$lib/utils/Api';
import { error, fail, redirect } from '@sveltejs/kit';
import { authenthificationSchema } from '$lib/schema/authentification';
import {OAuth2Client} from 'google-auth-library';
import { SECRET_CLIENT_ID, SECRET_CLIENT_SECRET } from '$env/static/private';

export const load: PageServerLoad = async () => {

};

export const actions = {
  signUp: async ({request}) => {
    console.log('🚀 ~ request:', request);
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
  }, OAuth2: async ({}) => {
    console.log('cioucou');

    const redirectUrl = '/api/oauth2';

    const oAth2Client = new OAuth2Client(
      SECRET_CLIENT_ID,
      SECRET_CLIENT_SECRET,
      redirectUrl
    );

    const authorizeUrl = oAth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile openid',
      prompt: 'consent'
  });

  throw redirect(302, authorizeUrl);
}
};
