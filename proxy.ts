import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["ru", "kg", "en"] as const;
const defaultLocale = "ru";

/**
 * Legacy alias: the old Kyrgyz locale code was "ky".
 * Redirect those URLs to the canonical "kg" prefix.
 */
const legacyRedirects: Record<string, string> = {
  ky: "kg",
};

function getLocale(request: NextRequest): string {
  // 1. Check a cookie the app can set when the user picks a language.
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && (locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  // 2. Fall back to the Accept-Language header.
  const header = request.headers.get("accept-language") ?? "";
  const accepted = header
    .split(",")
    .map((part) => part.split(";")[0].trim().split("-")[0])
    .filter(Boolean);

  for (const l of accepted) {
    // Map "ky" browser language tag to our "kg" locale.
    const mapped = l === "ky" ? "kg" : l;
    if ((locales as readonly string[]).includes(mapped)) return mapped;
  }

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle legacy /ky/* → /kg/* redirect.
  for (const [old, next] of Object.entries(legacyRedirects)) {
    if (pathname.startsWith(`/${old}/`) || pathname === `/${old}`) {
      request.nextUrl.pathname = pathname.replace(
        new RegExp(`^/${old}`),
        `/${next}`,
      );
      return NextResponse.redirect(request.nextUrl, { status: 308 });
    }
  }

  // Already has a valid locale prefix — let it through.
  const hasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );
  if (hasLocale) return NextResponse.next();

  // Redirect to the locale-prefixed path.
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip internal paths, API routes, and static files.
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
