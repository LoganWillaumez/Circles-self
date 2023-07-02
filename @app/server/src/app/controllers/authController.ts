import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken, {JwtPayload} from 'jsonwebtoken';
import jwbtoken from '../middlewares/jwtMiddleware';
import customerDataMapperInstance from '../datamapper/customerDatamapper';
import {sendMail} from '../../services/email';
import {wrapMethodsInTryCatch} from '../../utils/tryCatch';
import AppError from '../../utils/AppError';
import {sanitizeInputs} from '../../utils/text';
import { ErrorCode, TokenType } from '@circles-self/circles/enums';
import { CustomerInputDatas } from '@circles-self/circles/interfaces';
import {verifyToken} from '@circles-self/circles/utils/jwt';

const customerDataMapper = customerDataMapperInstance.main;

const authController: any = {
  async signIn(req: Request, res: Response) {
  const { email, password } = sanitizeInputs(req.body);

  const customer = await customerDataMapper.getCustomerByEmail(email);

  if (!customer) {
    throw new AppError(ErrorCode.AUTHENTICATION, 'userNoExist', 404);
  }

  if (!customer.activated_at) {
    throw new AppError(ErrorCode.AUTHENTICATION, 'userNoActivated', 403);
  }

  if (!customer.password) {
    throw new AppError(ErrorCode.AUTHENTICATION, 'userNoPassword', 403);
  }

  const passwordMatches = await bcrypt.compare(password, customer.password);

  if (!passwordMatches) {
    throw new AppError(ErrorCode.AUTHENTICATION, 'badCredentials', 401);
  }

  delete customer.password;

  res.status(200).json({
    initiallogin: customer.initiallogin,
    refreshToken:'Bearer ' + jwbtoken.generateToken(customer.customer_id, TokenType.REFRESHTOKEN)
  });
},

  async signUp(req: Request, res: Response) {
    const sanitizedInputs = sanitizeInputs(req.body);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(sanitizedInputs.password, salt);

    const userData: CustomerInputDatas = {
      ...sanitizedInputs,
      password: hashedPassword
    };
    
    const checkCustomer = await customerDataMapper.getCustomerByEmail(
      sanitizedInputs.email
    );

    if (checkCustomer) {
      throw new AppError(ErrorCode.AUTHENTICATION, 'userAlreadyExist', 403);
    }

    const createUser = await customerDataMapper.createUser(userData);

    if (createUser) {
      sendMail({
        to: 'logan.willaumez@gmail.com',
        subject: 'Circles registration',
        template: 'signup',
        context: {
          linkEmail: `http://127.0.0.1:5173/signup/email/${createUser.identifier}`
        }
      });
      res.status(201).json({message: 'Successfuly created'});
    }
  },

  async sendMail(req: Request, res: Response) {
    const emailSanitize = sanitizeInputs(req.body).email;
    const isActivate = await customerDataMapper.checkActivatedAtByEmail(
      emailSanitize
    );
    if (isActivate) {
      throw new AppError(
        ErrorCode.AUTHENTICATION,
        'userAlreadyActivated',
        403
      );
    }
    const checkCustomer = await customerDataMapper.getCustomerByEmail(
      emailSanitize
    );

    if (!checkCustomer) {
      throw new AppError(ErrorCode.AUTHENTICATION, 'userNoExist', 404);
    }

    sendMail({
      to: emailSanitize,
      subject: 'Inscription Circles',
      template: 'signup',
      context: {
        linkEmail: `http://127.0.0.1:5173/signup/email/${checkCustomer.identifier}`
      }
    });
    res.status(201).json({message: 'Email envoyé'});
  },

  async refresh(req: Request, res: Response) {
    const {cookies} = req;

    const refreshToken = cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError(ErrorCode.AUTHENTICATION, 'nonAutorisé', 401);
    }

    try{
      const verifyRefreshToken = await verifyToken(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);
      const {customer_id} = verifyRefreshToken as JwtPayload;

        res.status(200).json({
          accessToken:'Bearer ' + jwbtoken.generateToken(customer_id, TokenType.ACCESSTOKEN)
        });
    } catch(err: any){
      throw new AppError(err.errorCode, err.message, 401);
    }
  },

  async validUser(req: Request, res: Response) {
    const validUser = await customerDataMapper.validUser(req.body.identifier);
    console.log('🚀 ~ validUser:', validUser);

    if (validUser) {
      res
        .status(204)
        .json({message: `customer.validated.success`});
    } else {
      throw new AppError(ErrorCode.AUTHENTICATION, 'email.outdated', 410);
    }
  },
  logout(req: Request, res: Response) {
    const {cookies} = req;
    if (!cookies.jwt) {
      return res.sendStatus(204);
    }
    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true
    });
    return res.json({message: 'Déconnexion réussie'});
  }
};

export default wrapMethodsInTryCatch(authController);
