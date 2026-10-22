/** Map of lowercase ISO 4217 currency codes to their number of decimal places. */
export type CurrencyDecimalMap = Record<string, number>;

/**
 * Number of decimal places (minor unit exponent) for ISO 4217 currencies,
 * keyed by lowercase currency code.
 */
export const currencyDecimalMap: CurrencyDecimalMap;

/**
 * Get the number of decimal places (minor unit exponent) for a currency.
 * Falls back to 2 for unknown currency codes.
 * @param currency - ISO 4217 currency code (case insensitive)
 * @returns Number of decimal places (0, 1, 2, or 3)
 */
export function getExponentForCurrency(currency: string): number;

/**
 * Convert an amount in major units (e.g. dollars) to the currency's smallest
 * unit (e.g. cents), as an integer. Useful for payment APIs such as Stripe.
 * @param amount - Amount in major units
 * @param currency - ISO 4217 currency code (case insensitive)
 * @returns Integer amount in the smallest currency unit
 */
export function convertToSmallestCurrencyUnit(amount: number, currency: string): number;
