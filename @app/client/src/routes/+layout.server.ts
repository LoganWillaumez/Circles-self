
import {detectLocale} from '$lib/i18n/i18n-util';
import {redirect} from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

const langParam = 'lang';

export const load = (async event => {
  // Using a GET var "lang" to change locale\
  // const baseUrl = event.url.origin + event.url.pathname;
  const newLocale = event.url.searchParams.get(langParam);
  console.log('🚀 ~ newLocale:', newLocale);
  if (newLocale) {
    console.count(newLocale);
    event.cookies.set(langParam, newLocale, {path: '/'});
    event.url.searchParams.delete(langParam);
    // Redirect to remove the GET var
  
    console.log('🚀 ~ event.url.toString():', event.url);
    throw redirect(303, event.url.pathname.toString());
  }
  const locale = detectLocale(() => [event.cookies.get(langParam) ?? '']);
  event.locals.lang = locale;

  // Get the locale from the cookie

  return {locale, url: event.url.pathname, route: event.route.id, user: event.locals.user};
}) satisfies LayoutServerLoad;

