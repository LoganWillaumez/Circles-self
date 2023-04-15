import config from "../../../@app/server/src/config";
import { TokenType } from "../enums/token.enum";

export const setAuthToken = (name: 'accessToken' | 'refreshToken', cookies: any, token: string) => {
  cookies.set(name, `Bearer ${token}`, {
    httpOnly: true,
    sameSite: 'strict',
    secure: true,
    maxAge: TokenType.ACCESSTOKEN ?  config.token.accessTokenLife : config.token.refresnTokenLife
  });
};