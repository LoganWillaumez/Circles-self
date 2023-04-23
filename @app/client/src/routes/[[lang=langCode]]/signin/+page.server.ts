import type { PageServerLoad } from '../dashboard/$types';
import {authentification} from '../../../api/auth/auth';


export const load: PageServerLoad = async (event) => {
};

export const actions = {
  default: authentification.signin
};
