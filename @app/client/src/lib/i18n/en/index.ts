import type {BaseTranslation} from '../i18n-types';

const en: BaseTranslation = {
  button: {
    signUp: 'Sign up',
    signIn: 'Sign in',
    upload: 'Upload',
    uploadPicture: 'Upload a picture',
  },
  form: {
    firstName: 'Firstname',
    lastName: 'Lastname',
    gender: 'Genre',
    password: 'Password',
    confirmPassword: 'Confirm password',
    birthdate: 'Birthdate',
    forgotPassword: 'Forgot password',
    search: 'Search',
    description: 'Description',
    name: 'Name',
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
    welcomeExplainTitle: 'Welcome to Circles !',
    welcomeExplain1: 'Hello and welcome to Circles. Discover amazing Circles, connect with people worldwide, and share your passions.',
    welcomeExplain2: 'Join like-minded individuals, engage in meaningful discussions, and exchange ideas in Circles tailored to your interests.',
    welcomeProfileTitle: 'Profile picture',
    welcomeProfileExplain: 'Then you can choose to take a photo of yourself, upload a photo, or skip this step and get a common avatar. This will allow other users to get to know you better.',
    takePicture: 'Take a picture',
    uploadPicture: 'Upload a picture',
    emailSend: 'Email send',
    emailLink:
      'Click on the link into the email you receive to begin your journey !',
    emailLinkNoValid: 'The link is no longer valid',
    emailAskResend:
      'Please reconnect you to your account and re-send an activation email.',
    accountValidate: 'Your account has been validated !',
    accountAskSignin: 'You can now sign in to your account to enjoy Circles.',
    welcomeDoneDesc: 'Your account has been successfully finalized. Start your Circles experience by pressing the button below.',
    noCircle: 'It seems that you don\'t have any Circles.',
    noCircleDesc: 'You can either create a new Circle or wait to be invited into one.',
  },
  global: {
    switchLanguage: 'fr',
    close: 'Fermer',
    or: 'Or',
    next: 'Next',
    skip: 'Skip',
    start: 'Start',
    perfect: 'Perfect !',
    create: 'Create',
  }
};

export default en;
