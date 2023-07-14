import type {BaseTranslation} from '../i18n-types';

const en: BaseTranslation = {
  button: {
    signUp: 'Sign up',
    signIn: 'Sign in',
    upload: 'Upload',
    uploadPicture: 'Upload a picture',
    newEvent: 'New event',
    validate: 'Validate',
    refuse: 'Refuse',
    captureImage: 'Capture',
    home: 'Home',
    send: 'Send',
    tryAgain: 'Try again',
    resetPassword: 'Reset password',
    retry: 'Retry',
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
    email: 'Email',
    description: 'Description',
    name: 'Name',
    currentPassword: 'Current password',
    newPassword: 'New password',
    eventTitle: 'Event title',
    allDay: 'All day',
    startEvent: 'Start of the event',
    endEvent: 'End of the event',
    invite: 'Invite a new user to join the circle',
    inviteBase: 'Invite'
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
    emailOutdated: 'The email is outdated',
    circleSelfInvite: 'You cannot invite yourself',
    circleAlreadyInCircle: 'The user is already in the circle',
    resetCodeInvalid: 'The reset code is invalid',
    resetCodeExpired: 'The reset code has expired',
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
    favCircle: 'Favorite Circles',
    createdCircle: 'Your Circles has been successfully created', 
    createEvent: 'Your event has been successfully created',
    settings: 'Settings',
    global: 'Global',
    profile: 'Profile',
    noChange: 'No changes made.',
    updateUserSuccess: 'Your profile has been successfully updated.',
    passwordSameError: 'The new password must be different from the current one.',
    emailRequired: 'The email is required.',
    invalidCurrentPassword: 'The current password is invalid.',
    currentpasswordRequired: 'The current password is required.',
    confirmpasswordRequired: 'The confirmation of the new password is required.',
    newpasswordRequired: 'The new password is required.',
    deleteEvent: 'Are you sure you want to delete this event?',
    modifyEventSuccess: 'Your event has been successfully modified.',
    deleteEventSuccess: 'Your event has been successfully deleted.',
    askImage: 'Are you sure you validate this image?',
    imgProfileSuccess: 'Your profile picture has been successfully updated.',
    imgProfileError: 'An error has occurred while updating your profile picture.',
    inviteEmail: 'Enter the email address of the person you want to invite',
    invitePeople: 'Invite a person',
    modifyCircle: 'Modify a Circle',
    successInviteCircle: 'Your invitation has been successfully sent.',
    errorInviteCircle: 'An error has occurred while sending your invitation.',
    accountInviteSuccess: 'You have successfully joined the circle, you can now participate in the events or the chat of it.',
    circleAlreadyInvite: 'This user already exists within this circle',
    resendEmail: 'Resend an email',
    successUpdateCircle: 'Your circle has been successfully updated.',
    forgotPasswordTitle: 'Forgot password',
    forgotPasswordDesc: 'Enter your email address to receive a link to reset your password.',
    successForgotPassword: 'An email has been sent to you to reset your password.',
    passwordResetFailed: 'An error has occurred while resetting your password.',
    passwordResetSuccess: 'Your password has been successfully reset.',
  },
  global: {
    switchLanguage: 'fr',
    language: 'Language',
    fr: 'Français',
    en: 'English',
    close: 'Fermer',
    or: 'Or',
    next: 'Next',
    skip: 'Skip',
    start: 'Start',
    perfect: 'Perfect !',
    create: 'Create',
    confirm: 'Confirm',
    cancel: 'Cancel',
    modify: 'Modify',
  }
};

export default en;
