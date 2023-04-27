export async function load(event: any) {
    return {
        user: event.locals.user
    };
}