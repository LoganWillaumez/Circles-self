
import API from "$lib/utils/Api";
import { isAxiosError } from "axios";
import type { PageServerLoad } from "./$types";
import { error, fail } from "@sveltejs/kit";

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
    default:  async ({request, cookies, params}) => {
        const circle_id = params.circle_id;
        console.log('🚀 ~ circle_id:', circle_id);
        const data = await request.formData();
        const message = data.get('chat');
        
        try {
            const response = await API.post(`circles/${circle_id}/message`, {content: message}, cookies); 
            console.log('🚀 ~ response:', response);
            return response;
        } catch (err) {
            console.log('🚀 ~ err:', err);
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