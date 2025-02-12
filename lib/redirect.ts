// lib/redirect.ts

import { NextRequest, NextResponse } from 'next/server';

/**
 * Redirects the request to the specified URL path.
 *
 * @param {string} urlPath - The path to redirect to.
 * @param {NextRequest} req - The Next.js request object.
 * @returns {NextResponse} - The Next.js response object for the redirect.
 */
export function redirectTo(urlPath: string, req: NextRequest) {
  return NextResponse.redirect(new URL(urlPath, req.url));
}
