
import API from "../../../../../../../api/Api";
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
