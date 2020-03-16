declare module "locale-currency" {
  export function getCurrency(locale: string): string;
  export function getLocales(currencyCode: string): string[];
}
