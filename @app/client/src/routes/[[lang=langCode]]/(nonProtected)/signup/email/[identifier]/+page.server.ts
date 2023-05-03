import {redirect} from '@sveltejs/kit';
import { authentification } from '../../../../../../api/auth/auth';


export const load = async ({params}) => {
  console.log('loaaaad');
  console.log('🚀 ~ params:', params);
  // try{
  //   const {identifier} = params;
  //   const data = await authentification.activate(identifier);
  
  
  //   if (+data.status === 204) {
  //     throw redirect(301, '/signup/valid');
  //   }
  //   const message = data.data.message;
  //   return {message};
  // } catch (error) {
  //  console.log(error)
  // }
};
