export const matchPath = (path: string, patterns: string[]) => {
  return patterns.some((pattern) => {
    const dynamicPattern = pattern.replace(/\[.*?\]/g, '[^/]+'); // [id] → [^/]+
    const escaped = dynamicPattern.replace(/\//g, '\\/').replace(/\./g, '\\.');
    const regex = new RegExp(`^${escaped}$`);
    return regex.test(path);
  });
};

export const disableNavWithFooter = [
  '/not-found',
  '/dashboard',
  '/dashboard/settings',
  '/dashboard/profile',
  '/dashboard/students',
  '/dashboard/programs',
  '/dashboard/payments',
  '/dashboard/users',
  '/dashboard/bookmarks',
  '/dashboard/comments',
  '/dashboard/newsletters',
  '/dashboard/posts',
  '/login',
  '/register',
  '/forgot-password',
];
