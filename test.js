var LocaleCurrency = require('./');

var assert = require('assert');

assert(LocaleCurrency.getCurrency("us") === "USD");
assert(LocaleCurrency.getCurrency("US") === "USD");
assert(LocaleCurrency.getCurrency("Us") === "USD");
assert(LocaleCurrency.getCurrency("uS") === "USD");
assert(LocaleCurrency.getCurrency("EN_US") === "USD");
assert(LocaleCurrency.getCurrency("en_us") === "USD");
assert(LocaleCurrency.getCurrency("EN-US") === "USD");
assert(LocaleCurrency.getCurrency("en-us") === "USD");

assert(LocaleCurrency.getCurrency("GB") === "GBP");
assert(LocaleCurrency.getCurrency("ES") === "EUR");
assert(LocaleCurrency.getCurrency("GR") === "EUR");

var euroCountries = LocaleCurrency.getLocales("EUR");
assert(euroCountries.indexOf("GR") > -1); // Germany
assert(euroCountries.indexOf("FR") > -1); // France
assert(euroCountries.indexOf("ES") > -1); // Spain

console.log("PASSED");