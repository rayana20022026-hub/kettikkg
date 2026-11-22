/**
 * Server-only helpers.
 *
 * getDictionary() accepts an explicit locale argument received from
 * route params (await params in layout/page). There is no dependency on
 * "next/root-params" or any other server-only module, so this file is
 * safe to import from any Server Component.
 *
 * Client Components must import types from dictionaries-shared.ts.
 */
import { notFound } from "next/navigation";
import { dictionaries, hasLocale, type Locale } from "./dictionaries-shared";

// Re-export everything so existing imports keep working.
export * from "./dictionaries-shared";

/**
 * Loads the dictionary for the given locale.
 * Call this from Server Components after resolving the locale from params.
 *
 * @example
 *   const { lang } = await params;
 *   const dict = await getDictionary(lang);
 */
export async function getDictionary(locale: string) {
  if (!hasLocale(locale)) notFound();
  return dictionaries[locale as Locale]();
}
