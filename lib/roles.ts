// lib/roles.ts

import { BLOG_PATH, TRAINING_PATH } from './constants';

/**
 * Retrieves the allowed roles based on the requested pathname.
 *
 * @param {string} pathname - The current request path.
 * @returns {string[] | null} - An array of allowed roles or null if no specific roles are required.
 */
export function getAllowedRoles(pathname: string): string[] | null {
  if (pathname.startsWith(BLOG_PATH)) return ['admin', 'author'];
  if (pathname.startsWith(TRAINING_PATH))
    return ['admin', 'student', 'staff', 'tutor'];
  return null; // No roles mean no access required
}
