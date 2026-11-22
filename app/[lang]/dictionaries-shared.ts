/**
 * Shared locale types, data, and loaders.
 *
 * This file has NO server-only dependencies and is safe to import
 * from both Server Components and Client Components (or their type-only imports).
 *
 * The server-only getDictionary() helper lives in dictionaries.ts, which
 * must only be imported from Server Components.
 */

export const dictionaries = {
  ru: () =>
    import("@/app/i18n/locales/ru/landing.json").then((m) => m.default),
  kg: () =>
    import("@/app/i18n/locales/kg/landing.json").then((m) => m.default),
  en: () =>
    import("@/app/i18n/locales/en/landing.json").then((m) => m.default),
};

export type Locale = keyof typeof dictionaries;

export const locales: Locale[] = ["ru", "kg", "en"];
export const defaultLocale: Locale = "ru";

export function hasLocale(locale: string): locale is Locale {
  return locale in dictionaries;
}

export type Dictionary = Awaited<
  ReturnType<(typeof dictionaries)[Locale]>
>;

/**
 * Plural helper — returns the correct word form for a given count.
 * Russian uses three forms (1 / 2–4 / 5+).
 * Kyrgyz and English use the same form for all counts.
 */
export function plural(
  n: number,
  forms: [string, string, string],
): string {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return forms[1];
  return forms[2];
}
