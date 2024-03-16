import { fail, error } from '@sveltejs/kit';
import API from '$lib/utils/Api';
import { isAxiosError } from 'axios';

export const actions = {
  default: async ({ request, cookies }: any) => {
    const formData = new FormData();
    formData.append('profileImage', request.body.get('profileImage'));

    try {
      const response = await API.put('customer/profile-image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        cookies
      });
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
