import {
    getCurrency,
    getLocales,
    currencyDecimalMap,
    getExponentForCurrency,
    convertToSmallestCurrencyUnit,
} from './index.js';
import * as decimals from './currency-decimals.js';
import * as pkg from 'locale-currency';
import * as decimalsSubpath from 'locale-currency/decimals';
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

// Test getLocales edge cases
assert.deepStrictEqual(getLocales("usd"), getLocales("USD")); // case insensitive
assert.deepStrictEqual(getLocales("ZZZ"), []); // unknown currency
assert.deepStrictEqual(getLocales(""), []);
assert.deepStrictEqual(getLocales("GBP").sort(), ["GB", "GG", "GS", "IM", "JE"]);
assert.deepStrictEqual(getLocales("JPY"), ["JP"]);
assert(getLocales("USD") !== getLocales("USD")); // fresh array each call
// Every country round-trips through getCurrency and getLocales
for (const [country, currency] of Object.entries(map)) {
    assert(getLocales(currency).includes(country), `${country} missing from getLocales(${currency})`);
}

// Every map entry is a valid ISO 3166-1 alpha-2 / ISO 4217 code pair
for (const [country, currency] of Object.entries(map)) {
    assert(/^[A-Z]{2}$/.test(country), `bad country code ${country}`);
    assert(/^[A-Z]{3}$/.test(currency), `bad currency code ${currency} for ${country}`);
}
// Check against the runtime's ISO 4217 list where available (Node 18+). ICU
// lags ISO 4217, so codes newer than the runtime's ICU data are allowed.
if (typeof Intl.supportedValuesOf === "function") {
    const iso4217 = new Set(Intl.supportedValuesOf("currency"));
    const newerThanIcu = new Set(["SLE", "VED", "XCG", "ZWG"]);
    for (const [country, currency] of Object.entries(map)) {
        assert(iso4217.has(currency) || newerThanIcu.has(currency), `unknown ISO 4217 code ${currency} for ${country}`);
    }
}

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

// Package exports resolve to the same modules
assert(pkg.getCurrency === getCurrency);
assert(pkg.getExponentForCurrency === getExponentForCurrency);
assert(decimalsSubpath.getExponentForCurrency === getExponentForCurrency);
assert(decimalsSubpath.convertToSmallestCurrencyUnit === convertToSmallestCurrencyUnit);
assert(decimalsSubpath.currencyDecimalMap === currencyDecimalMap);
assert.deepStrictEqual(Object.keys(decimalsSubpath).sort(), [
    "convertToSmallestCurrencyUnit",
    "currencyDecimalMap",
    "getExponentForCurrency",
]); // subpath does not expose the locale functions

// Decimals subpath edge cases
assert(getExponentForCurrency("") === 2);
assert(convertToSmallestCurrencyUnit(0, "USD") === 0);
assert(convertToSmallestCurrencyUnit(19.99, "zzz") === 1999); // unknown uses 2 decimals
assert(convertToSmallestCurrencyUnit(1.5, "jpy") === 2); // rounds for zero-decimal currencies
assert(Number.isInteger(convertToSmallestCurrencyUnit(123.456789, "BHD")));

console.log("PASSED");