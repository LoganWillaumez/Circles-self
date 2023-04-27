
import {authentification} from '../../../../api/auth/auth';
import type { PageServerLoad } from './$types';


export const load: PageServerLoad = async (event) => {
};

export const actions = {
  default: authentification.signin
};
