# locale-currency

A map of locale codes to ISO 4217 currency codes. Supports **BCP 47**, **i18n**, and **ISO 3166-1 alpha-2** locale formats.

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

### CommonJS

```javascript
const { getCurrency, getLocales } = require('locale-currency');

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
```
