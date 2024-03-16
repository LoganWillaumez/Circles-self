import {redirect, type RequestEvent} from '@sveltejs/kit';
import { authentification } from '../../../../../../api/auth/auth';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async ({params}: any) => {
    const {identifier} = params;
    const data = await authentification.activate(params);
  
  
    if (data && data.status === 204) {
      throw redirect(303, '/signup/valid');
    }
    const message = data ? data.data.message : '';
    return {message};
};
