import API from "$lib/utils/Api";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, cookies, locals, url }) => {
    const circle_id = params.circle_id;

    const actualCircle = await API.get(`circles/${circle_id}`, undefined,  cookies)
    return {
        user: locals.user,
        actualCircle,
        url: url.pathname
    }
};




export const actions = {
  default: async (event) => {
    const formDataEntries = await event.request.formData();
    const invite = formDataEntries.get('invite');

    if(invite) {
        const response = API.post(`circles/invite/${event.params.circle_id}`, formDataEntries, event.cookies);
        return response;
    }
    
    },
  };

