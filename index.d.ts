/**
 * Get the ISO 4217 currency code for a given locale.
 * Supports BCP 47 (e.g., zh-Hant-TW), i18n (e.g., en_US), and ISO 3166-1 alpha-2 codes.
 * @param locale - BCP 47, i18n, or ISO 3166-1 alpha-2 code
 * @returns The currency code or null if not found
 */
export function getCurrency(locale: string): string | null;

/**
 * Get all country codes that use a given currency.
 * @param currencyCode - ISO 4217 currency code
 * @returns Array of ISO 3166-1 alpha-2 country codes
 */
export function getLocales(currencyCode: string): string[];
