import express from 'express';
import authController from '../controllers/authController';
import validationMiddleware from '../middlewares/validationMiddleware';
import authSchema from '../services/validation/authSchema';
import jwbtoken from '../middlewares/jwtMiddleware';

const authRoutes = express.Router();

authRoutes
  .get('/refresh', authController.refresh)
  .post(
    '/signin',
    validationMiddleware(authSchema.signin()),
    authController.signIn
  )
  .post(
    '/signup',
    validationMiddleware(authSchema.signup()),
    authController.signUp
  )
  .post('/forgotpassword',validationMiddleware(authSchema.forgotPassword()), authController.forgotPassword)
  .post('/forgot/:identifier',validationMiddleware(authSchema.forgotValid()), authController.validForgotPassword)
  .post('/password-reset',validationMiddleware(authSchema.passwordReset()), authController.passwordReset)
  .post('/activate', authController.validUser)
  .post('/sendmail', authController.sendMail)
  .post('/logout', jwbtoken.getAuthorization, authController.logout);

export default authRoutes;
