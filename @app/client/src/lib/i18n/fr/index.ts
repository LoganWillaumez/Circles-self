import type {Translation} from '../i18n-types';

const fr: Translation = {
  button: {
    signUp: "S'inscrire",
    signIn: 'Se connecter',
    upload: 'Télécharger',
    uploadPicture: 'Télécharger une photo',
  },
  form: {
    firstName: 'Prénom',
    lastName: 'Nom',
    gender: 'Genre',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    birthdate: 'Date de naissance',
    forgotPassword: 'Mot de passe oublié',
    search: 'Rechercher',
    description: 'Description',
    name: 'Nom',
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
    welcomeExplainTitle: 'Bienvenue sur Circles !',
    welcomeExplain1: 'Bonjour et bienvenue sur Circles. Découvrez des cercles incroyables, connectez-vous avec des gens du monde entier et partagez vos passions.',
    welcomeExplain2: 'Rejoignez des personnes partageant les mêmes idées, participez à des discussions enrichissantes et échangez des idées dans des Circles adaptés à vos centres d\'intérêt.',
    welcomeProfileTitle: 'Photo de profil',
    welcomeProfileExplain: 'Ensuite, vous pouvez choisir de prendre une photo de vous-même, télécharger une photo ou passer cette étape et obtenir un avatar commun. Cela permettra aux autres utilisateurs de mieux vous connaître.',
    takePicture: 'Prendre une photo',
    uploadPicture: 'Télécharger une photo',
    emailSend: 'Email envoyé',
    emailLink:
      "Cliquez sur le lien dans l'email que vous avez reçu pour commencer votre voyage !",
    emailLinkNoValid: "Le lien n'est plus valide",
    emailAskResend:
      "Veuillez vous reconnecter à votre compte et renvoyer un email d'activation.",
    accountValidate: 'Votre compte a bien été validé !',
    accountAskSignin:
      'Vous pouvez maintenant vous connectez a votre compte afin de profiter de Circles.',
      welcomeDoneDesc: 'Votre compte a bien été finalisé. Commencez votre expérience Circles en appuyant sur le bouton ci-dessous.',
    noCircle: 'Il semble que vous n\'ayez aucun cercle.',
    noCircleDesc: 'Vous pouvez soit créer un nouveau cercle, soit attendre d\'être invité dans un cercle existant.',
    favCircle: 'Cercles favoris',
    createdCircle: 'Votre cercle a bien été créé.',
  },
  global: {
    switchLanguage: 'en',
    close: 'Fermer',
    or: 'Ou',
    next: 'Suivant',
    skip: 'Passer',
    start: 'Commencer',
    perfect: 'Parfait !',
    create: 'Créer',
  }
};

export default fr;
