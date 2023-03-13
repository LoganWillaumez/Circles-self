import type { PageServerLoad} from './$types'
import { authentification } from '../../api/auth/auth';


export const load: PageServerLoad = async() => {
    // todo
}

export const actions = {
  default: authentification.signin
  };