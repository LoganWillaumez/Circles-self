import type {BaseTranslation} from '../i18n-types';

const en: BaseTranslation = {
  button: {
    signUp: 'Sign up',
    signIn: 'Sign in'
  },
  form: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    gender: 'Genre',
    password: 'Password',
    confirmPassword: 'Confirm password',
    birthdate: 'Birthdate',
    forgotPassword: 'Forgot password'
  },
  serverError: {
    userAlreadyExist: 'The user already exist',
    userAlreadyActivated: 'The user is already activated',
    userNoExist: 'The user does not exist',
    userNoActivated: 'The user is not activated',
    notKnow: 'Unknown error',
    errorGlobal: 'An error has occurred',
    badCredentials: 'The email or password is incorrect',
    unauthorized: 'You are not authorized to access this page',
    emailOutdated: 'The email is outdated'
  },
  desc: {
    emailSend: 'Email send',
    emailLink:
      'Click on the link into the email you receive to begin your journey !',
    emailLinkNoValid: 'The link is no longer valid',
    emailAskResend:
      'Please reconnect you to your account and re-send an activation email.',
    accountValidate: 'Your account has been validated !',
    accountAskSignin: 'You can now sign in to your account to enjoy Circles.'
  },
  global: {
    switchLanguage: 'fr',
    close: 'Fermer',
    or: 'Or'
  }
};

export default en;
