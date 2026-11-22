/**
 * Central i18n entry point.
 *
 * Locale codes used throughout the app:
 *   ru  — Russian
 *   kg  — Kyrgyz
 *   en  — English
 *
 * Each locale has one JSON file per page, e.g.:
 *   app/i18n/locales/{ru,kg,en}/landing.json
 *
 * Add more pages by creating matching files in each locale folder and
 * exporting a typed loader below.
 */

export const locales = ["ru", "kg", "en"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ru";

/** Type-safe locale guard. */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// ─── Page loaders ────────────────────────────────────────────────────────────

/** Loads translations for the landing page. */
export async function getLandingDict(locale: Locale) {
  switch (locale) {
    case "ru":
      return (await import("./locales/ru/landing.json")).default;
    case "kg":
      return (await import("./locales/kg/landing.json")).default;
    case "en":
      return (await import("./locales/en/landing.json")).default;
  }
}

export type LandingDict = Awaited<ReturnType<typeof getLandingDict>>;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns the correct plural form for a given count.
 *   Russian: three forms — 1 / 2–4 / 5+
 *   Kyrgyz / English: same form for all counts (all three entries identical)
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

/** Human-readable locale labels for switcher UI. */
export const localeLabels: Record<Locale, string> = {
  ru: "РУС",
  kg: "КЫР",
  en: "ENG",
};
