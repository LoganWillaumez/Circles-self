import jsonwebtoken, {Algorithm} from 'jsonwebtoken';
import dotenv from 'dotenv';
import {NextFunction, Request, Response} from 'express';
import customerDataMapperInstance from '../datamapper/customerDatamapper';
import AppError from '../../utils/AppError';
import { CustomerDatas, ErrorCode } from '@circles-self/circles/interfaces';
import { TokenType } from '@circles-self/circles/enums';
import config from '../../config';

const customerDataMapper = customerDataMapperInstance.main;
dotenv.config();

interface JwtPayload {
  id: number;
  iat: number;
  exp: number;
}

const jwbtoken = {
/**
 * Generate a token based on the userID and token type
 * @param id {number}
 * @param tokenType {'access' | 'refresh'}
 */
generateToken(id: number, tokenType: TokenType.ACCESSTOKEN | TokenType.REFRESHTOKEN) {
  const jwtOptions = {
    algorithm: 'HS256' as Algorithm,
    expiresIn: tokenType === TokenType.ACCESSTOKEN ? config.token.accessTokenLife : config.token.refresnTokenLife,
  };
  const secretKey = tokenType === TokenType.ACCESSTOKEN ? process.env.ACCESS_TOKEN_SECRET : process.env.REFRESH_TOKEN_SECRET;

  return jsonwebtoken.sign(
    { id },
    secretKey as string,
    jwtOptions
  );
},

  /**
   * Verify the access token based on the request received
   * @param req {Request}
   * @param res {Response}
   * @param next {NextFunction}
   */
  // eslint-disable-next-line consistent-return
  async getAuthorization(req: Request, res: Response, next: NextFunction) {
    const authHeader =
      req.headers.authorization || (req.headers.Authorization as string);
    const token = authHeader?.startsWith('Bearer ')
      ? authHeader.split(' ')[1]
      : '';
    if (!token) {
      throw new AppError(ErrorCode.JWT, 'unauthorized', 401);
    }
    const payload = (await jsonwebtoken.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    )) as JwtPayload;
    if (!payload) {
      throw new AppError(ErrorCode.JWT, 'user.forbidden', 403);
    }
    const user = await customerDataMapper.getCustomerById(payload.id);

    if (!user) {
      throw new AppError(ErrorCode.JWT, 'user.noExist', 403);
    }
    req.user = user as CustomerDatas;
    next();

    // await jsonwebtoken.verify(token, process.env.ACCESS_TOKEN_SECRET!, async (err, payload) => {
    //   if (err) {
    //     res.status(403);
    //     throw new Error('Forbidden');
    //   }
    //   const { id } = payload as JwtPayload;
    //   const user = await customerDataMapper.getCustomerById(id);
    //   req.userId = id;
    //   next();
    // });
  }
};

export default jwbtoken;
