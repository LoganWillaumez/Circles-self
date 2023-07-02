import { redirect } from "@sveltejs/kit";
import { checkExpireToken, setAuthToken, verifyToken } from "@circles-self/circles/utils";
import { TokenType } from "@circles-self/circles/enums";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '$env/static/private';
import API from "$lib/utils/Api";

// Routes that don't require authentication
const notGuardedRoutes = ['/home', '/signin', '/signup', '/valid', '/signup/valid'];
const dynamicNotGuardedRoutes = ['/signup/valid', '/signup/email'];


/**
 * Check if the access token is valid and not expired
 * @param {string} accessToken - Access token
 * @returns {Promise<boolean>} - True if access token is valid and not expired, otherwise false
 */
const isAccessTokenValidAndNotExpired = async (accessToken: any) => {

  if (!accessToken) {
    return false;
  }

  const validToken = await verifyToken(accessToken, ACCESS_TOKEN_SECRET);
  return validToken && await checkExpireToken(validToken, TokenType.ACCESSTOKEN);
};

/**
 * Check if the refresh token is valid and not expired
 * @param {string} refreshToken - Refresh token
 * @returns {Promise<boolean>} - True if refresh token is valid and not expired, otherwise false
 */
const isRefreshTokenValidAndNotExpired = async (refreshToken: any) => {

  if (!refreshToken) {
    return false;
  }
  const validToken = await verifyToken(refreshToken, REFRESH_TOKEN_SECRET);
  return validToken && await checkExpireToken(validToken, TokenType.REFRESHTOKEN);
};
/**
 * Redirect the user to the home page and delete refresh and access tokens
 * @param {any} event - Event object
 */
const redirectToHome = (event: any) => {
  event.cookies.delete('refreshToken');
  event.cookies.delete('accessToken');
  throw redirect(303, '/home');
};

/**
 * Fetch user data if it doesn't exist locally
 * @param {any} cookies - Cookies object
 * @returns {Promise<object>} - User data
 */
const fetchUserData = async (cookies: any, event: any) => {
  try {
    const userData = await API.get('customer', undefined, cookies);
    return userData.data;
  } catch (error) {
    redirectToHome(event);
  }
};
/**
 * Handle SvelteKit middleware for managing refreshToken and accessToken.
 * @param {object} param0 - The object containing the event, resolve function, and cookies.
 * @returns {Promise<object>} - The result of the event resolution or a redirection.
 */
export const handle = async ({ event, resolve }) => {
  const refreshToken = event.cookies.get('refreshToken');
  const accessToken = event.cookies.get('accessToken');


  if (event.url.pathname === '/') {
    throw redirect(303, '/home');
  }
  
  const isAccessTokenValid = await isAccessTokenValidAndNotExpired(accessToken);
  const isRefreshTokenValid = await isRefreshTokenValidAndNotExpired(refreshToken);

  // Check if the requested route is a non-guarded route
  if (notGuardedRoutes.includes(event.url.pathname) || dynamicNotGuardedRoutes.some((route) => event.url.pathname.startsWith(route))) {
    if (!refreshToken) {
      accessToken && event.cookies.delete('accessToken');
      return await resolve(event);
    }

    if (isRefreshTokenValid) {
      // Refresh the access token if needed
      if (!isAccessTokenValid) {
        try {
          const newAccessToken = await API.get('auth/refresh', undefined, event.cookies);
          setAuthToken(TokenType.ACCESSTOKEN, event.cookies, newAccessToken.data.accessToken);
        } catch (error) {
          redirectToHome(event);
        }
      }

      // Fetch user data if it doesn't exist locally or the user hasn't completed the initial login process
      if (!event.locals.user || !event.locals.user.initiallogin) {
        event.locals.user = await fetchUserData(event.cookies, event);
      }

      // Redirect the user based on the initiallogin value and the requested route
      if (event.locals.user.initiallogin) {
        throw redirect(303, '/dashboard');
      } else if (event.url.pathname.startsWith('/welcome')) {
        return await resolve(event);
      } else {
        throw redirect(303, '/welcome/explain');
      }
    }

    // Continue with the event resolution for non-guarded routes
    return await resolve(event);
  } else {
    // Guarded routes scenario

    // If refreshToken doesn't exist or is not valid, redirect to home
    if (!refreshToken || !isRefreshTokenValid) {
      return redirectToHome(event);
    }

    // If refreshToken is valid and not expired
    if (isRefreshTokenValid) {
      // Refresh the access token if needed
      if (!isAccessTokenValid) {
        try {
          const newAccessToken = await API.get('auth/refresh', undefined, event.cookies);
          setAuthToken(TokenType.ACCESSTOKEN, event.cookies, newAccessToken.data.accessToken);
        } catch (error) {
          redirectToHome(event);
        }
      }

      // Fetch user data if it doesn't exist locally
      if (!event.locals.user) {
        event.locals.user = await fetchUserData(event.cookies, event);
      }

      // Continue with the event resolution for guarded routes since both tokens are valid and not expired, and local user data is available
      if (event.locals.user.initiallogin) {
        if(event.url.pathname.startsWith('/welcome')){
          throw redirect(303, '/dashboard');
        } else {
          return await resolve(event);
        }
      } else {
        if(event.url.pathname.startsWith('/welcome')){
          return await resolve(event);
        } else {
          throw redirect(303, '/welcome/explain');
        }
      }
    } else {
      // refreshToken is expired, redirect to home
      return redirectToHome(event);
    }
  }
};
