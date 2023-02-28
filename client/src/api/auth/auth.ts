import { fail, type Actions } from "@sveltejs/kit";
import { authenthificationSchema } from "$lib/schema/authentification";
import API from "../Api";
import { validateData } from "$lib/schema/validation";

export const authentification: Actions = {
    signup: async ({request} : any) => {
        const {formData, errors} = await validateData( await request.formData(), authenthificationSchema.registerSchema); 
        if (errors) {
          return fail(400, {
            data: formData,
            errors: errors.fieldErrors
          });
        }
        try{
            const response = await API.post("auth/signup", formData);
            return response;
        } catch(err: any) {
            return fail(err.response.status, {message: err.response.data.message});
        }
    }
}