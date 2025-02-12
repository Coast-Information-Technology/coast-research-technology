// lib/errorHandler.ts
import { NextApiRequest, NextApiResponse } from 'next';

/**
 * Handles errors in Next.js API routes, sending a JSON response with the error status and message.
 *
 * @param {any} err - The error object, potentially containing status and message properties.
 * @param {NextApiRequest} req - Next.js API request object.
 * @param {NextApiResponse} res - Next.js API response object.
 * @returns {void} - Sends a JSON response with the error details.
 */
export const errorHandler = (
  err: { status?: number; message?: string },
  req: NextApiRequest,
  res: NextApiResponse
): void => {
  const status = err.status || 500;
  const message = err.message || 'An error occurred';

  console.error(`Error: ${message} (Status: ${status})`);

  res.status(status).json({ error: message });
};
