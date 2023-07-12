import { customerSchema } from '$lib/schema/customer.js';
import { validateData } from '$lib/schema/validation';
import { error, fail } from '@sveltejs/kit';
import API from '$lib/utils/Api';
import { isAxiosError } from 'axios';
import { detectLocale } from 'typesafe-i18n/detectors';

export async function load(event: any) {

    return {
        user: event.locals.user,
        lang: event.locals.lang || event.cookies.get('lang'),
    };
}

export const actions = {
    default:  async ({request, cookies, locals}) => {
        const {formData, errors} = await validateData(
          await request.formData(),
          customerSchema.update
        );
        if (errors) {
          return fail(400, {
            data: formData,
            errors: errors.fieldErrors
          });
        }

        const passwordFieldsFilled =
        formData.newpassword !== '' && formData.confirmpassword !== '' && formData.currentpassword !== '';
    
      const otherFieldsChanged =
      formData.firstname !== locals.user.firstname ||
      formData.lastname !== locals.user.lastname ||
      formData.email !== locals.user.email ||
      formData.birthdate !== locals.user.birthdate;
      
    if (!otherFieldsChanged && !passwordFieldsFilled) {
        return fail(400, {
            message: "noChange"
        });
    }
    
    // Vérifiez si les champs de mot de passe sont remplis et si la validation a échoué
    if (passwordFieldsFilled && errors) {
        return fail(400, {
            message: "noChange"
        });
    }
        try {
          const response = await API.put('customer', formData, cookies);
          return response;
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
      }
  };
  