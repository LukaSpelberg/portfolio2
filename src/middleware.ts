import { NextRequest, NextResponse } from 'next/server';

/**
 * Locale initialisation — first-visit only, never enforced.
 *
 * On the very first visit (no `locale_init` cookie) we try to serve the
 * most likely language based on the domain:
 *   *.com  →  redirect to ?lang=en  (English-speaking audience)
 *   *.nl   →  no redirect            (Dutch is the default already)
 *
 * After that the cookie is set and this middleware is a no-op forever.
 * The user can always switch language manually via the toggle and we
 * never override their choice.
 */
export function middleware(request: NextRequest) {
  const url              = request.nextUrl;
  const hostname         = url.hostname;
  const hasLangParam     = url.searchParams.has('lang');
  const alreadyInitialized = request.cookies.has('locale_init');

  // User already went through initialisation — never interfere again
  if (alreadyInitialized) return NextResponse.next();

  // User has an explicit lang param — respect it and mark as done
  if (hasLangParam) {
    const res = NextResponse.next();
    res.cookies.set('locale_init', '1', { path: '/', maxAge: 31_536_000, sameSite: 'lax' });
    return res;
  }

  // First visit, no explicit preference yet
  const isDotCom = hostname.endsWith('.com') && !hostname.includes('localhost');

  if (isDotCom) {
    // Redirect once to English and mark as done
    const redirectUrl = url.clone();
    redirectUrl.searchParams.set('lang', 'en');
    const res = NextResponse.redirect(redirectUrl, { status: 302 });
    res.cookies.set('locale_init', '1', { path: '/', maxAge: 31_536_000, sameSite: 'lax' });
    return res;
  }

  // Any other domain (.nl, localhost, etc.) — Dutch is fine, just mark done
  const res = NextResponse.next();
  res.cookies.set('locale_init', '1', { path: '/', maxAge: 31_536_000, sameSite: 'lax' });
  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon\\.ico|.*\\.webp|.*\\.png|.*\\.jpg|.*\\.svg).*)',
  ],
};
