import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT || '';
const JWT_EXPIRATION = '1h'; // Adjust this as needed

/**
 * Generates a JSON Web Token (JWT) for the specified user ID.
 *
 * @param {string} userId - The unique ID of the user.
 * @returns {string} - Signed JWT with the user ID embedded in the payload.
 * @throws {Error} - Throws an error if the JWT secret is missing from the environment variables.
 */
export const generateToken = (userId: string): string => {
  if (!JWT_SECRET) {
    console.error('JWT secret is missing in environment variables.');
    throw new Error('Server configuration error: JWT secret not set.');
  }

  const options: SignOptions = { expiresIn: JWT_EXPIRATION };
  const payload = { id: userId };

  return jwt.sign(payload, JWT_SECRET, options);
};

/**
 * Verifies and decodes a JSON Web Token (JWT).
 *
 * @param {string} token - The JWT string to verify and decode.
 * @returns {string | null} - Returns the user ID if the token is valid, otherwise null.
 */
export const verifyToken = (token: string): string | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload & {
      id: string;
    };
    return decoded.id;
  } catch (error) {
    console.error('Invalid or expired token', error);
    return null;
  }
};

/**
 * Sends a successful JSON response.
 *
 * @param {number} statusCode - HTTP status code for success.
 * @param {string} message - Success message.
 * @param {object} [data={}] - Optional data to send with the response.
 * @returns {NextResponse} - Formatted successful response.
 */
export const sendSuccessResponse = (
  statusCode: number,
  message: string,
  data: object = {}
): NextResponse => {
  return NextResponse.json(
    {
      success: true,
      message,
      data,
    },
    { status: statusCode }
  );
};

/**
 * Sends an error JSON response.
 *
 * @param {number} statusCode - HTTP status code for error.
 * @param {string} message - Error message.
 * @param {object} [error={}] - Optional error details to include in the response.
 * @returns {NextResponse} - Formatted error response.
 */
export const sendErrorResponse = (
  statusCode: number,
  message: string,
  error: object = {}
): NextResponse => {
  return NextResponse.json(
    {
      success: false,
      message,
      error,
    },
    { status: statusCode }
  );
};
