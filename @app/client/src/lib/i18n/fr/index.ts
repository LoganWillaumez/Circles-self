import type {Translation} from '../i18n-types';

const fr: Translation = {
  button: {
    signUp: "S'inscrire",
    signIn: 'Se connecter'
  },
  form: {
    firstName: 'Prénom',
    lastName: 'Nom',
    gender: 'Genre',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    birthdate: 'Date de naissance',
    forgotPassword: 'Mot de passe oublié'
  },
  serverError: {
    userAlreadyExist: "L'utilisateur existe déjà",
    userAlreadyActivated: "L'utilisateur est déjà activé",
    userNoExist: "L'utilisateur n'existe pas",
    userNoActivated: "L'utilisateur n'est pas activé",
    notKnow: 'Erreur non connue',
    errorGlobal: 'Une erreur est survenue',
    badCredentials: "L'email ou le mot de passe est incorrect",
    unauthorized: "Vous n'êtes pas autorisé à accéder à cette page",
    emailOutdated: "L'email est périmé"
  },
  desc: {
    emailSend: 'Email envoyé',
    emailLink:
      "Cliquez sur le lien dans l'email que vous avez reçu pour commencer votre voyage !",
    emailLinkNoValid: "Le lien n'est plus valide",
    emailAskResend:
      "Veuillez vous reconnecter à votre compte et renvoyer un email d'activation.",
    accountValidate: 'Votre compte a bien été validé !',
    accountAskSignin:
      'Vous pouvez maintenant vous connectez a votre compte afin de profiter de Circles.'
  },
  global: {
    switchLanguage: 'en',
    close: 'Fermer',
    or: 'Ou'
  }
};

export default fr;
