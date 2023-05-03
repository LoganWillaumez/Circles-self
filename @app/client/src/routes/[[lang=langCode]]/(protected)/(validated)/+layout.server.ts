export const load = async (event: any) =>{
    return {
        user: event.locals.user
    };
}