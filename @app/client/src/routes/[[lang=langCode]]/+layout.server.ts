
import {detectLocale} from '$lib/i18n/i18n-util';
import {redirect} from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const langParam = 'lang';

export const load = (async event => {
  // Using a GET var "lang" to change locale\
  // const baseUrl = event.url.origin + event.url.pathname;
  const newLocale = event.url.searchParams.get(langParam);
  if (newLocale) {
    event.cookies.set(langParam, newLocale, {path: '/'});
    event.url.searchParams.delete(langParam);
    // Redirect to remove the GET var
    
    throw redirect(303, event.url.toString());
  }

  // Get the locale from the cookie
  const locale = detectLocale(() => [event.cookies.get(langParam) ?? '']);
  event.locals.lang = locale;

  return {locale, url: event.url.pathname, route: event.route.id, user: event.locals.user};
}) satisfies LayoutServerLoad;

