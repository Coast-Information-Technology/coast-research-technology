import { setCookie, destroyCookie, parseCookies } from "nookies";

// Utility type to define a generic error handler
type ErrorHandler = (error: unknown) => void;

const defaultErrorHandler: ErrorHandler = (error) => {
  console.error("Cookie operation error:", error);
};

/**
 * Save token into browser cookies.
 *
 * @param cookieName - Name of the cookie to set.
 * @param cookieValue - Value of the cookie to set.
 * @param errorHandler - Optional custom error handler.
 * @returns A boolean indicating if the cookie was set successfully.
 */
export const saveTokenToCookies = (
  cookieName: string,
  cookieValue: string,
  errorHandler: ErrorHandler = defaultErrorHandler
): boolean => {
  try {
    setCookie(null, cookieName, cookieValue, {
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "lax", // CSRF protection
    });
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
};

/**
 * Retrieve token from browser cookies.
 *
 * @param cookieName - Name of the cookie to retrieve.
 * @returns The cookie value or null if not found.
 */
export const getTokenFromCookies = (cookieName: string): string | null => {
  const cookies = parseCookies();
  return cookies[cookieName] || null;
};

/**
 * Delete authentication-related cookies.
 *
 * @param cookieNames - Array of cookie names to delete.
 * @param errorHandler - Optional custom error handler.
 * @returns A boolean indicating if the cookies were deleted successfully.
 */
export const deleteTokensFromCookies = (
  cookieNames: string[],
  errorHandler: ErrorHandler = defaultErrorHandler
): boolean => {
  try {
    cookieNames.forEach((cookieName) => {
      destroyCookie(null, cookieName, { path: "/" });
    });
    return true;
  } catch (error) {
    errorHandler(error);
    return false;
  }
};
