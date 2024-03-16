import {redirect} from '@sveltejs/kit';
import { LL } from '$lib/i18n/i18n-svelte';
import { authentification } from '../../../../../../api/auth/auth';
import API from "$lib/utils/Api";

export const load = async ({params, cookies, url}) => {
  let search = url.search;

  // Supprimer le "?" au début
  search = search.substring(1);
  
  // Diviser la chaîne en paires clé-valeur
  const pairs = search.split('&');
  
  // Rechercher la paire qui commence par "invitee="
  const inviteePair = pairs.find(pair => pair.startsWith('invitee='));
  const invitee = inviteePair ? inviteePair.replace('invitee=', '') : null;
  
    
    const {identifier} = params;
    const response: any = await API.post(`circles/invitation/${identifier}`, { invitee: invitee }, cookies);
  
  
    if (response.status === 204) {
      throw redirect(303, `/circles/${response.data.circle_id}`);
    }
    const message = response.data.message;
    return {message};
};
