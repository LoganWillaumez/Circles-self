import API from "../../../../../../api/Api";

export const actions = {
  default: async (event) => {
    console.log('coucou');
    try{
      const user = await API.put('customer', {initiallogin: true}, event.cookies);
      return user;
    } catch (e) {
      return { status: 500, body: 'Internal Server caca' };
    }
}
};