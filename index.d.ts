declare module "locale-currency" {
  export function getCurrency(locale: string): string | null;
  export function getLocales(currencyCode: string): string[];
}
