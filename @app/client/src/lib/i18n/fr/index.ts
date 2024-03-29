import type {Translation} from '../i18n-types';

const fr: Translation = {
  button: {
    signUp: "S'inscrire",
    signIn: 'Se connecter',
    upload: 'Télécharger',
    uploadPicture: 'Télécharger une photo',
    newEvent: 'Nouvel événement',
    validate: 'Valider',
    refuse: 'Refuser',
    captureImage: 'Capturer',
    home: 'Accueil',
    send: 'Envoyer',
    tryAgain: 'Réessayer',
    resetPassword: 'Réinitialiser le mot de passe',
    retry: 'Réessayer',
  },
  form: {
    firstName: 'Prénom',
    lastName: 'Nom',
    gender: 'Genre',
    password: 'Mot de passe',
    email: 'Email',
    confirmPassword: 'Confirmer le mot de passe',
    birthdate: 'Date de naissance',
    forgotPassword: 'Mot de passe oublié',
    search: 'Rechercher',
    description: 'Description',
    name: 'Nom',
    currentPassword: 'Mot de passe actuel',
    newPassword: 'Nouveau mot de passe',
    eventTitle: 'Titre de l\'événement',
    allDay: 'Toute la journée',
    startEvent: 'Début de l\'événement',
    endEvent: 'Fin de l\'événement',
    invite: 'Inviter un nouvel utilisateur à rejoindre le cercle',
    inviteBase: 'Inviter',
    male: 'Homme',
    female: 'Femme',
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
    emailOutdated: "L'email est périmé",
    circleSelfInvite: "Vous ne pouvez pas vous inviter vous-même",
    circleAlreadyInCircle: "L'utilisateur est déjà dans le cercle",
    resetCodeInvalid: "Le code de réinitialisation est invalide",
    resetCodeExpired: "Le code de réinitialisation a expiré",
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
    createEvent: 'Votre événement a bien été créé.',
    settings: 'Paramètres',
    global: 'Globaux',
    profile: 'Profil',
    noChange: 'Aucun changement effectué',
    updateUserSuccess: 'Votre profil a bien été mis à jour',
    passwordSameError: 'Le nouveau mot de passe doit être différent de l\'ancien',
    invalidCurrentPassword: 'Le mot de passe actuel est incorrect',
    emailRequired: 'L\'email est requis',
    currentpasswordRequired: 'Le mot de passe actuel est requis',
    newpasswordRequired: 'Le nouveau mot de passe est requis',
    confirmpasswordRequired: 'La confirmation du nouveau mot de passe est requise',
    deleteEvent: 'Êtes-vous sûr de vouloir supprimer cet événement ?',
    deleteEventSuccess: 'Votre évènement a bien été supprimé',
    modifyEventSuccess: 'Votre événement a bien été modifié',
    askImage: 'Êtes-vous sûr de valider cette image ?',
    imgProfileSuccess: 'Votre photo de profil a bien été mise à jour',
    imgProfileError: 'Une erreur est survenue lors de la mise à jour de votre photo de profil',
    inviteEmail: 'Mettez l\'adresse email de la personne que vous souhaitez inviter',
    invitePeople: 'Inviter une personne',
    modifyCircle: 'Modifier le cercle',
    successInviteCircle: 'Votre invitation a bien été envoyée',
    errorInviteCircle: 'Une erreur est survenue lors de l\'envoi de votre invitation',
    accountInviteSuccess: 'Vous avez bien rejoint le cercle, vous pouvez maintenant participer aux événements ou au chat de celui-ci.',circleAlreadyInvite: 'Cet utilisateur existe déjà au sein de ce cercle',
    resendEmail: 'Renvoyer un email',
    successUpdateCircle: 'Votre cercle a bien été mis à jour',
    forgotPasswordTitle: 'Mot de passe oublié',
    forgotPasswordDesc: 'Veuillez entrer votre adresse email afin de recevoir un lien pour réinitialiser votre mot de passe.',
    successForgotPassword: 'Un email vous a été envoyé afin de réinitialiser votre mot de passe',
    passwordResetFailed: 'La réinitialisation du mot de passe a échoué',
    passwordResetSuccess: 'Votre mot de passe a bien été réinitialisé',
  },
  global: {
    language: 'Langue',
    switchLanguage: 'en',
    fr: 'Français',
    en: 'Anglais',
    close: 'Fermer',
    or: 'Ou',
    next: 'Suivant',
    skip: 'Passer',
    start: 'Commencer',
    perfect: 'Parfait !',
    create: 'Créer',
    confirm: 'Confirmer',
    cancel: 'Annuler',
    modify: 'Modifier'
  },
  errorInput : {
      firstnameRequired: 'Requis',
    firstnameMaxLength: 'Ne peut pas dépasser 20 caractères',
    lastnameRequired: 'Requis',
    lastnameMaxLength: 'Ne peut pas dépasser 20 caractères',
    passwordMinLength: 'Doit comporter au moins 3 caractères',
    passwordMaxLength: 'Ne peut pas dépasser 30 caractères',
    genderRequired: 'Requis',
    confirmPasswordMinLength: 'Doit comporter au moins 3 caractères',
    confirmPasswordMaxLength: 'Ne peut pas dépasser 30 caractères',
    emailRequired: 'Requis',
    emailMaxLength: 'Ne peut pas dépasser 64 caractères',
    invalidEmail: 'N\'est pas valide',
    birthdateRequired: 'Requis',
    passwordsMustMatch: 'Doivent correspondre',
    nameRequired: 'Requis',
    nameMaxLength: 'Ne peut pas dépasser 10 caractères',
    descriptionRequired: 'Requis',
    descriptionMaxLength: 'Ne peut pas dépasser 50 caractères',
    passwordLength: 'Doit avoir entre 3 et 30 caractères',
    passwordNotMatch: 'Ne correspondent pas',
    titleRequired: 'Requis',
    startRequired: 'Requis',
    endRequired: 'Requis',
    invalidStart: 'N\'est pas valide',
    invalidEnd: 'N\'est pas valide',
    newPasswordMinLength: 'Doit comporter au moins 3 caractères',
    newPasswordMaxLength: 'Ne peut pas dépasser 30 caractères',
    randomCodeRequired: 'Requis',
    confirmNewPasswordMinLength: 'Doit comporter au moins 3 caractères',
    confirmNewPasswordMaxLength: 'Ne peut pas dépasser 30 caractères',
    notKnow: 'Erreur',
  }
  
};

export default fr;
