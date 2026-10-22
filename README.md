# locale-currency

A map of locale codes to ISO 4217 currency codes, plus currency decimal-place (minor unit) data for converting amounts to their smallest unit. Supports **BCP 47**, **i18n**, and **ISO 3166-1 alpha-2** locale formats.

## Supported Formats

- **BCP 47** language tags (e.g., `zh-Hant-TW`, `en-US`, `pt-BR`)
- **i18n** locale codes with underscores (e.g., `en_US`, `zh_TW`)
- **ISO 3166-1 alpha-2** country codes (e.g., `US`, `GB`, `TW`)

The library intelligently extracts the country/region code from complex locale strings to determine the appropriate currency.

## Installation

```bash
npm install locale-currency
```

## Usage

### ES Modules (recommended)

```javascript
import { getCurrency, getLocales } from 'locale-currency';

// Get currency for a locale
getCurrency('US');           // 'USD'
getCurrency('en-US');        // 'USD'
getCurrency('en_US');        // 'USD'
getCurrency('zh-Hant-TW');   // 'TWD' - BCP 47 format
getCurrency('GB');           // 'GBP'
getCurrency('ES');           // 'EUR'

// Get all countries that use a currency
const euroCountries = getLocales('EUR');
// ['AD', 'AT', 'BE', 'CY', 'DE', 'EE', 'ES', 'FI', 'FR', 'GR', ...]
```

### Currency decimal places

Get the number of decimal places a currency uses and convert amounts to the
smallest unit (e.g. cents) for payment APIs such as Stripe.

```javascript
import { getExponentForCurrency, convertToSmallestCurrencyUnit } from 'locale-currency';

getExponentForCurrency('USD');  // 2
getExponentForCurrency('JPY');  // 0
getExponentForCurrency('KWD');  // 3

convertToSmallestCurrencyUnit(10.99, 'USD');  // 1099
convertToSmallestCurrencyUnit(1000, 'JPY');   // 1000
convertToSmallestCurrencyUnit(1.234, 'KWD');  // 1234
```

The decimal data is also available as a standalone subpath import, so you can
use it without pulling in the locale map:

```javascript
import { getExponentForCurrency } from 'locale-currency/decimals';
```

### CommonJS

This package is published as ES modules. From CommonJS, use a dynamic `import()`
(or a plain `require()` on Node 22+, which supports requiring ES modules):

```javascript
const { getCurrency, getLocales } = await import('locale-currency');

getCurrency('en-US'); // 'USD'
```

## API

### `getCurrency(locale: string): string | null`

Returns the ISO 4217 currency code for a given locale, or `null` if not found.

- **Parameters:**
  - `locale` - BCP 47, i18n, or ISO 3166-1 alpha-2 code
- **Returns:** Currency code (e.g., `'USD'`, `'EUR'`) or `null`

### `getLocales(currencyCode: string): string[]`

Returns an array of ISO 3166-1 alpha-2 country codes that use the given currency.

- **Parameters:**
  - `currencyCode` - ISO 4217 currency code (e.g., `'USD'`, `'EUR'`)
- **Returns:** Array of country codes

### `getExponentForCurrency(currency: string): number`

Returns the number of decimal places (the ISO 4217 "minor unit" exponent) for a currency. Unknown codes fall back to `2`.

- **Parameters:**
  - `currency` - ISO 4217 currency code (case insensitive)
- **Returns:** `0`, `1`, `2`, or `3`

### `convertToSmallestCurrencyUnit(amount: number, currency: string): number`

Converts an amount in major units (e.g. dollars) to an integer in the currency's smallest unit (e.g. cents), rounding to the nearest unit.

- **Parameters:**
  - `amount` - Amount in major units
  - `currency` - ISO 4217 currency code (case insensitive)
- **Returns:** Integer amount in the smallest unit

### `currencyDecimalMap: Record<string, number>`

The underlying map of lowercase ISO 4217 codes to decimal places, exported for direct use.

## Examples

```javascript
import { getCurrency, getLocales } from 'locale-currency';

// Case insensitive
getCurrency('us');   // 'USD'
getCurrency('US');   // 'USD'
getCurrency('Us');   // 'USD'

// i18n format with underscores
getCurrency('EN_US');  // 'USD'
getCurrency('en_us');  // 'USD'

// BCP 47 format with hyphens
getCurrency('EN-US');  // 'USD'
getCurrency('en-us');  // 'USD'

// Complex BCP 47 with script code
getCurrency('zh-Hant-TW');  // 'TWD' (Traditional Chinese in Taiwan)
getCurrency('zh-Hans-CN');  // 'CNY' (Simplified Chinese in China)

// Direct country codes
getCurrency('GB');  // 'GBP'
getCurrency('ES');  // 'EUR'
getCurrency('GR');  // 'EUR'

// Find countries using Euro
const euroCountries = getLocales('EUR');
console.log(euroCountries.includes('GR'));  // true (Greece)
console.log(euroCountries.includes('FR'));  // true (France)
console.log(euroCountries.includes('ES'));  // true (Spain)

// Combine both: charge a user in their local currency's smallest unit
const currency = getCurrency('ja-JP');                     // 'JPY'
const amount = convertToSmallestCurrencyUnit(1500, currency); // 1500 (yen has no minor unit)
```
