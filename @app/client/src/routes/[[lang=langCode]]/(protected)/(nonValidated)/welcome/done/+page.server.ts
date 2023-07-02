import API from "$lib/utils/Api";

export const actions = {
  default: async (event) => {
    try{
      const user = await API.put('customer', {initiallogin: true}, event.cookies);
      return user;
    } catch (e) {
      return { status: 500, body: 'Internal Server caca' };
    }
}
};