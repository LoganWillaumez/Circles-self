import {authentification} from '../../../api/auth/auth';
import type {PageServerLoad} from './$types';

export const load: PageServerLoad = async () => {
  // todo
};

export const actions = {
  default: authentification.signin
};
