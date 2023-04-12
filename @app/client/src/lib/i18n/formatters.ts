import type {FormattersInitializer, LocalizedString} from 'typesafe-i18n';
import {LL} from './i18n-svelte';
import type {Locales, Formatters, TranslationFunctions} from './i18n-types';

export const initFormatters: FormattersInitializer<Locales, Formatters> = (
  locale: Locales
) => {
  const formatters: Formatters = {
    // add your formatter functions here
  };

  return formatters;
};

// export const translate = (group: keyof TranslationFunctions, messageKey: string): LocalizedString => {
// 	const messageGroup = LL[group];

// 	if (messageKey in messageGroup) {
// 	  return messageGroup[messageKey as keyof typeof messageGroup]();
// 	} else {
// 	  return LL.serverError.notKnow();
// 	}
//   };
