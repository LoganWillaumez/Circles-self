import type { Translation } from "$lib/i18n/i18n-types";

export const  tradHelper = (data : string, defaultKey: string, dictionary: Translation) => {
    let translationKey = data;
    // Si le message d'erreur est une clé de traduction valide
    if (translationKey in dictionary) {
      return dictionary[translationKey as keyof typeof dictionary]();
    } else {
      // Sinon, utilisez la clé de traduction par défaut
      return dictionary[defaultKey as keyof typeof dictionary]();
    }
  }