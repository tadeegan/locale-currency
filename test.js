import { getCurrency, getLocales } from './index.js';
import assert from 'assert';

// Test case insensitivity
assert(getCurrency("us") === "USD");
assert(getCurrency("US") === "USD");
assert(getCurrency("Us") === "USD");
assert(getCurrency("uS") === "USD");

// Test i18n format (underscore)
assert(getCurrency("EN_US") === "USD");
assert(getCurrency("en_us") === "USD");

// Test BCP 47 format (hyphen)
assert(getCurrency("EN-US") === "USD");
assert(getCurrency("en-us") === "USD");

// Test direct country codes
assert(getCurrency("GB") === "GBP");
assert(getCurrency("ES") === "EUR");
assert(getCurrency("GR") === "EUR");

// Test BCP 47 with script codes
assert(getCurrency("zh-Hant-TW") === "TWD"); // Traditional Chinese in Taiwan
assert(getCurrency("zh-Hans-CN") === "CNY"); // Simplified Chinese in China
assert(getCurrency("zh-Hans-SG") === "SGD"); // Simplified Chinese in Singapore
assert(getCurrency("pt-BR") === "BRL"); // Portuguese in Brazil
assert(getCurrency("en-GB") === "GBP"); // English in UK
assert(getCurrency("fr-CA") === "CAD"); // French in Canada

// Test getLocales
const euroCountries = getLocales("EUR");
assert(euroCountries.indexOf("GR") > -1); // Greece
assert(euroCountries.indexOf("FR") > -1); // France
assert(euroCountries.indexOf("ES") > -1); // Spain

// Test null for invalid codes
assert(getCurrency("XX") === null);
assert(getCurrency("invalid") === null);

console.log("PASSED");