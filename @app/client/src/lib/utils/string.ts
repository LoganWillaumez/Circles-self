import type { Translation } from "$lib/i18n/i18n-types";

export const tradHelper = (data: string, defaultKey: string, dictionary: Translation) => {
  let translationKey = data;
  if (translationKey in dictionary) {
    return dictionary[translationKey as keyof typeof dictionary];
  } else {
    return dictionary[defaultKey as keyof typeof dictionary];
  }
}
