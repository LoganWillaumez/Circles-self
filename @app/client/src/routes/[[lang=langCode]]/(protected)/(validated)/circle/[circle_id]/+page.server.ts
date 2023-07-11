import { circlesSchema } from "$lib/schema/circles";
import { validateData } from "$lib/schema/validation";
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
  default: async (event) => {

    const {formData, errors} = await validateData(
      await event.request.formData(),
      circlesSchema.inviteCircle
    );
    
    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      });
    }

    try {
    if(formData.invite) {
        const response: any = await API.post(`circles/invite/${event.params.circle_id}`, formData, event.cookies);
        if(response.status === 200){
          return response;
        }
      }} catch (err) {
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

