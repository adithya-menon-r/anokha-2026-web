export function isNavbarHidden(pathname: string): boolean {
  const hiddenNavbarRoutes = [
    '/login',
    '/signup',
    '/signup/verify',
    '/reset-password',
    '/reset-password/verify',
  ];
  if (pathname.startsWith('/transactions')) return true;

  return hiddenNavbarRoutes.some((r) => pathname.startsWith(r));
}

export function isFooterHidden(pathname: string): boolean {
  const hiddenFooterRoutes = [
    '/login',
    '/signup',
    '/signup/verify',
    '/reset-password',
    '/reset-password/verify',
    '/profile',
    '/coming-soon',
  ];
  if (pathname.startsWith('/transactions')) return true;
  if (pathname.startsWith('/events/') && pathname !== '/events') return true;
  return hiddenFooterRoutes.some((r) => pathname.startsWith(r));
}
