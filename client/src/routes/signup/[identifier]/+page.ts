import { goto } from "$app/navigation";
import { authentification } from "../../../api/auth/auth"


export const load = async({ params }) => {

    const {identifier} = params; 
    try {
       const data = await authentification.activate(identifier);
       if(+data.status === 204){
              goto('/login');
       }    
    } catch(err){
        throw new Error('error');
    }
}