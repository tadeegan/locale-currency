import {
    getCurrency,
    getLocales,
    currencyDecimalMap,
    getExponentForCurrency,
    convertToSmallestCurrencyUnit,
} from './index.js';
import * as decimals from './currency-decimals.js';
import map from './map.js';
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

// Test currency decimal exponents
assert(getExponentForCurrency("USD") === 2);
assert(getExponentForCurrency("usd") === 2); // case insensitive
assert(getExponentForCurrency("JPY") === 0);
assert(getExponentForCurrency("KWD") === 3);
assert(getExponentForCurrency("BHD") === 3);
assert(getExponentForCurrency("MGA") === 1);
assert(getExponentForCurrency("XCG") === 2); // Caribbean guilder
assert(getExponentForCurrency("ZZZ") === 2); // unknown falls back to 2

// Every currency returned by getCurrency has a decimal entry
for (const code of new Set(Object.values(map))) {
    assert(code.toLowerCase() in currencyDecimalMap, `missing decimal entry for ${code}`);
}
// Every decimal entry is a valid exponent
for (const [code, exp] of Object.entries(currencyDecimalMap)) {
    assert(/^[a-z]{3}$/.test(code), `bad key ${code}`);
    assert([0, 1, 2, 3, 4].includes(exp), `bad exponent for ${code}`);
}

// Test conversion to smallest unit
assert(convertToSmallestCurrencyUnit(10.99, "USD") === 1099);
assert(convertToSmallestCurrencyUnit(0.1 + 0.2, "USD") === 30); // rounds float noise
assert(convertToSmallestCurrencyUnit(1000, "JPY") === 1000);
assert(convertToSmallestCurrencyUnit(1.234, "KWD") === 1234);
assert(convertToSmallestCurrencyUnit(2.5, "MGA") === 25);
assert(convertToSmallestCurrencyUnit(-4.5, "EUR") === -450);

// Subpath module exposes the same functions as the main entry
assert(decimals.getExponentForCurrency === getExponentForCurrency);
assert(decimals.convertToSmallestCurrencyUnit === convertToSmallestCurrencyUnit);
assert(decimals.currencyDecimalMap === currencyDecimalMap);

console.log("PASSED");