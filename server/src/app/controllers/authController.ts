import sanitizeHtml from 'sanitize-html';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { registerData } from '../../ts/interfaces/customer.interfaces';
import jwbtoken from '../middlewares/jwtMiddleware';
import customerDataMapper from '../datamapper/customerDatamapper';
import { sendMail } from '../../services/email';
import { wrapMethodsInTryCatch } from '../../utils/tryCatch';
import AppError from '../../utils/AppError';
import { ErrorCode } from '../../ts/interfaces/errorCode';

const authController: any = {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const emailSanitize = sanitizeHtml(email);
    const passwordSanitize = sanitizeHtml(password);

    const checkCustomer = await customerDataMapper.getCustomerByEmail(emailSanitize);

    if (!checkCustomer) {
      throw new AppError(ErrorCode.AUTHENTIFICATION, 'account.noExist', 404);
    } else {
      const isActivate = await customerDataMapper.checkActivatedAtByEmail(emailSanitize);
      if (!isActivate) {
        throw new AppError(ErrorCode.AUTHENTIFICATION, 'account.notActivated', 403);
      }
      const pass = await bcrypt.compare(passwordSanitize, checkCustomer.password);

      if (pass) {
        delete checkCustomer.password;
        res.cookie('jwt', jwbtoken.generateRefreshToken(checkCustomer.id), {
          httpOnly: true,
          sameSite: 'none',
          secure: true,
          maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        res.status(200).json({ accessToken: jwbtoken.generateAccessToken(checkCustomer.id) });
      } else {
        throw new AppError(ErrorCode.AUTHENTIFICATION, 'bad.credentials', 401);
      }
    }
  },

  async signUp(req: Request, res: Response) {
    const {
      firstname, lastname, email, password, birthdate, img, gender,
    } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizeHtml(password), salt);

    const userData: registerData = {
      firstname: sanitizeHtml(firstname),
      lastname: sanitizeHtml(lastname),
      email: sanitizeHtml(email),
      password: hashedPassword,
      birthdate: sanitizeHtml(birthdate),
      img: sanitizeHtml(img),
      gender: sanitizeHtml(gender),
    };

    const checkCustomer = await customerDataMapper.getCustomerByEmail(sanitizeHtml(email));

    if (checkCustomer) {
      throw new AppError(ErrorCode.AUTHENTIFICATION, 'user.alreadyExist', 403);
    }

    const createUser = await customerDataMapper.createUser(userData);

    if (createUser) {
      sendMail({
        to: 'logan.willaumez@gmail.com',
        subject: 'Circles registration',
        template: 'signup',
        context: {
          linkEmail: `http://127.0.0.1:5173/signup/email/${createUser.identifier}`,
        },
      });
      res.status(201).json({ message: 'Successfuly created' });
    }
  },

  async sendMail(req: Request, res: Response) {
    const emailSanitize = sanitizeHtml(req.body.email);
    const isActivate = await customerDataMapper.checkActivatedAtByEmail(emailSanitize);
    if (isActivate) {
      throw new AppError(ErrorCode.AUTHENTIFICATION, 'account.alreadyActivated', 403);
    }
    const checkCustomer = await customerDataMapper.getCustomerByEmail(emailSanitize);

    if (!checkCustomer) {
      throw new AppError(ErrorCode.AUTHENTIFICATION, 'account.noExist', 404);
    }

    sendMail({
      to: emailSanitize,
      subject: 'Circles registration',
      template: 'signup',
      context: {
        linkEmail: `http://127.0.0.1:5173/signup/email/${checkCustomer.identifier}`,
      },
    });
    res.status(201).json({ message: 'Email send' });
  },
  refresh(req: Request, res: Response) {
    const { cookies } = req;
    if (!cookies?.jwt) {
      throw new AppError(ErrorCode.AUTHENTIFICATION, 'unauthorized', 401);
    }

    const refreshToken = cookies?.jwt;

    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: unknown, payload: unknown) => {
      if (err) {
        throw new AppError(ErrorCode.AUTHENTIFICATION, 'unauthorized', 401);
      }
      const { id } = payload as JwtPayload;

      res.status(200).json({ accessToken: jwbtoken.generateAccessToken(id) });
    });
  },

  async validUser(req: Request, res: Response) {
    const validUser = await customerDataMapper.validUser(req.body.identifier);
    console.log('🚀 ~ validUser:', validUser);
    if (validUser) {
      res.status(204).json({ message: `Customer successfuly activated at ${validUser}` });
    } else {
      throw new AppError(ErrorCode.AUTHENTIFICATION, 'emailOutdated', 410);
    }
  },
  logout(req: Request, res: Response) {
    const { cookies } = req;
    if (!cookies.jwt) {
      return res.sendStatus(204);
    }
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    return res.json({ message: 'successfully logout' });
  },
};

export default wrapMethodsInTryCatch(authController);
