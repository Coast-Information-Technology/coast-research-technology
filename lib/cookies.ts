import { setCookie, destroyCookie, parseCookies } from 'nookies';

type ErrorHandler = (error: unknown) => void;

const defaultErrorHandler: ErrorHandler = (error) => {
  console.error('[Cookie Error]:', error);
};

// Default cookie settings
const defaultOptions = {
  maxAge: 30 * 24 * 60 * 60, // 30 days
  path: '/',
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
  httpOnly: false, // Accessible from the client
};

/**
 * Save a token into browser cookies.
 *
 * @param cookieName - Name of the cookie to set.
 * @param cookieValue - Value of the cookie to set.
 * @param options - Optional cookie settings.
 * @param errorHandler - Optional custom error handler.
 * @returns Boolean indicating if the cookie was set successfully.
 */
export const saveTokenToCookies = (
  cookieName: string,
  cookieValue: string,
  options: Partial<typeof defaultOptions> = {},
  errorHandler: ErrorHandler = defaultErrorHandler
): boolean => {
  try {
    setCookie(null, cookieName, cookieValue, {
      ...defaultOptions,
      ...options,
    });
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
};

/**
 * Retrieve a token from browser cookies.
 *
 * @param cookieName - Name of the cookie to retrieve.
 * @returns The cookie value or null if not found.
 */
export const getTokenFromCookies = (cookieName: string): string | null => {
  try {
    const cookies = parseCookies();
    return cookies[cookieName] ?? null;
  } catch (error) {
    defaultErrorHandler(error);
    return null;
  }
};

/**
 * Delete one or more cookies.
 *
 * @param cookieNames - Names of cookies to delete.
 * @param options - Optional cookie settings.
 * @param errorHandler - Optional custom error handler.
 * @returns Boolean indicating if the cookies were deleted successfully.
 */
export const deleteTokensFromCookies = (
  cookieNames: string[],
  options: Partial<typeof defaultOptions> = {},
  errorHandler: ErrorHandler = defaultErrorHandler
): boolean => {
  try {
    cookieNames.forEach((cookieName) => {
      destroyCookie(null, cookieName, {
        path: '/',
        ...options,
      });
    });
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
};
