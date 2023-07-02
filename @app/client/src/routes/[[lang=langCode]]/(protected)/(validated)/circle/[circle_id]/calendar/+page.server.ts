
import { validateData } from "$lib/schema/validation";
import { isAxiosError } from "axios";
import API from "$lib/utils/Api";
import type { PageServerLoad } from "./$types";
import { eventSchema } from "$lib/schema/event";
import { error, fail } from "@sveltejs/kit";

export const load: PageServerLoad = (async ({ params, cookies, locals, url }) => {
    const circle_id = params.circle_id;

    const actualCircle = await API.get(`circles/${circle_id}`, undefined,  cookies)
    return {
        user: locals.user,
        actualCircle,
        url: url.pathname
  }
}) satisfies PageServerLoad;


export const actions = {
  createEvent: async (event) => {
    const formDataEntries = await event.request.formData();
    const modifiedFormDataEntries = Array.from(formDataEntries).map(([key, value]) => {
      if (key === 'allday') {
        return [key, true];
      }
      return [key, value];
    });
    
    const {formData, errors} = await validateData(
      modifiedFormDataEntries,
      eventSchema.createEvent
    );
    if (errors) {
      return fail(400, {
        data: formData,
        errors: errors.fieldErrors
      });
    }

    try {
      const response = await API.post(`circles/${event.params.circle_id}/event`, formData, event.cookies);
      if(response.status === 201){
        return response;
      }
    } catch (err) {
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
},
modifyEvent: async (event) => {
  const formDataEntries = await event.request.formData();

  const modifiedFormDataEntries = Array.from(formDataEntries).map(([key, value]) => {
    if (key === 'allday') {
      return [key, true];
    }
    return [key, value];
  });
  const formDataObject = Object.fromEntries(modifiedFormDataEntries);
  const event_id = formDataObject.id;

  const {formData, errors} = await validateData(
    modifiedFormDataEntries,
    eventSchema.updateEvent // Assuming the patch and create have the same schema
    );
  if (errors) {
    return fail(400, {
      data: formData,
      errors: errors.fieldErrors
    });
  }

  try {
    const response = await API.put(`circles/${event.params.circle_id}/event/${event_id}`, formData, event.cookies);
    if(response.status === 200){
      return response;
    }
  } catch (err) {
    if (isAxiosError(err)) {
      if (err.response) {
        return fail(err.response.status, {
          message: err.response.data.message,
        });
      } else {
        return error(500);
      }
    } else {
      return error(500);
    }
  }
},
  };

