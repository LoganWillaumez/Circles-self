import type {Action, Actions, PageServerLoad} from './$types'

// export const signIn: Actions = {
//     default:async ({ request }) => {
//         const form = await request.formData();
//     }
// }

export const load: PageServerLoad = async() => {
    // todo
}

const register : Action = async ({request}) =>{
    const data = await request.formData();
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const password = data.get('password');
    const email = data.get('email');
    const gender = data.get('gender');
    console.log({firstName})
    
}

export const actions: Actions = {register};