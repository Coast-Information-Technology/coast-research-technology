// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { UNAUTHORIZED_PATH, FORBIDDEN_PATH } from '../lib/constants';
import { redirectTo } from '../lib/redirect';
import { getAllowedRoles } from '../lib/roles';

const secret = process.env.JWT_SECRET;

/**
 * Middleware function to handle JWT authentication and role-based access control.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {NextResponse} - The Next.js response object, allowing or blocking the request.
 */
export function middleware(req: NextRequest) {
  const authHeader = req.headers.get('authorization');

  // Check for missing Authorization header or invalid format
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return redirectTo(UNAUTHORIZED_PATH, req);
  }

  // Extract token from "Bearer <token>" format
  const token = authHeader.split(' ')[1];
  if (!secret) return redirectTo(UNAUTHORIZED_PATH, req);

  try {
    // Verify the JWT token and extract role
    const decoded = jwt.verify(token, secret) as JwtPayload & { role?: string };
    const allowedRoles = getAllowedRoles(req.nextUrl.pathname);

    // If path requires roles, verify if the user’s role is authorized
    if (allowedRoles && !allowedRoles.includes(decoded.role || '')) {
      return redirectTo(FORBIDDEN_PATH, req);
    }
  } catch (error) {
    // Log token verification errors and redirect to unauthorized
    console.error('Token verification failed:', error);
    return redirectTo(UNAUTHORIZED_PATH, req);
  }

  // If verification passes, allow the request to proceed
  return NextResponse.next();
}
