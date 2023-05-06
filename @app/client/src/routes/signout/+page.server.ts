import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "../$types";
  

export const load: PageServerLoad = async () => {
    throw redirect(303, '/home');
  };

  
export const actions = {
    default: async (event: any) => {
        event.cookies.delete('accessToken');
        event.cookies.delete('refreshToken');
        event.locals.user = null;
        throw redirect(303, '/home');
    }
}