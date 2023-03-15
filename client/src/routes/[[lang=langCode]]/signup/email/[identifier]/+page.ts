import { redirect } from "@sveltejs/kit";
import { authentification } from "../../../../../api/auth/auth";



export const load = async({ params }) => {

    const {identifier} = params; 
       const data = await authentification.activate(identifier);

       if(+data.status === 204){
        throw redirect(301, '/signup/valid')
       }    
}