import sanitizeHtml from 'sanitize-html';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jsonwebtoken, { JwtPayload } from 'jsonwebtoken';
import { registerData } from '../../ts/interfaces/customer.interfaces';
import jwbtoken from '../middlewares/jwtMiddleware';
import customerDataMapper from '../datamapper/customerDatamapper';

const authController: any = {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    const emailSanitize = sanitizeHtml(email);
    const passwordSanitize = sanitizeHtml(password);

    const checkCustomer = await customerDataMapper.getCustomerByEmail(emailSanitize);

    if (!checkCustomer) {
      res.status(404);
      throw new Error('Account doesn\'t exist');
    } else {
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
        res.status(401);
        throw new Error('Invalid credentials');
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
      res.status(403);
      throw new Error('Email already exist in Database');
    }

    const createUser = await customerDataMapper.createUser(userData);

    if (createUser) {
      res.status(201).json({ message: 'Successfuly created' });
    }
  },

  refresh(req: Request, res: Response) {
    const { cookies } = req;
    if (!cookies?.jwt) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const refreshToken = cookies?.jwt;

    jsonwebtoken.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, payload: any) => {
      if (err) {
        res.status(401);
        throw new Error('Unauthorized');
      }
      const { id } = payload as JwtPayload;

      res.status(200).json({ accessToken: jwbtoken.generateAccessToken(id) });
    });
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

export default authController;
