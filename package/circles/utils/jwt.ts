import config from "../../../@app/server/src/config";
import { ErrorCode } from "../enums";
import { TokenType } from "../enums/token.enum";
import { JwtPayload } from "../interfaces/jwt.interface";
import jsonwebtoken from 'jsonwebtoken';

export const setAuthToken = (name: TokenType, cookies: any, token: string) => {
  cookies.set(name, token, {
    path:'/',
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'prod',
    maxAge: TokenType.ACCESSTOKEN ?  config.token.accessTokenLife : config.token.refresnTokenLife
  });
};


export const checkExpireToken = async (
  decodedPayload: JwtPayload,
  tokenType: TokenType
): Promise<JwtPayload> => {
  const currentTime = Math.floor(Date.now() / 1000);
  if (decodedPayload.exp < currentTime) {
    return Promise.reject({
      errorCode: ErrorCode.AUTHENTICATION,
      message: `${tokenType}.expired`,
      status: 401
    });
  }

  return decodedPayload;
};

export const verifyToken = async (
  token: string,
  tokenSecret: string
): Promise<JwtPayload> => {
  const jwt = token.split(' ')[1];
  const decodedPayload: JwtPayload = await new Promise((resolve, reject) => {
    jsonwebtoken.verify(jwt, tokenSecret, (err: unknown, payload: unknown) => {
      if (err) {
        reject({
          errorCode: ErrorCode.AUTHENTICATION,
          message: 'Unauthorized',
          status: 401
        });
      } else {
        resolve(payload as JwtPayload);
      }
    });
  });

  return decodedPayload;
};