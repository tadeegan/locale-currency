// TypeScript type checking tests
import { getCurrency, getLocales } from './index.js';

// Test getCurrency return types
const currency1: string | null = getCurrency('US');
const currency2: string | null = getCurrency('zh-Hant-TW');
const currency3: string | null = getCurrency('en_US');

// Test that getCurrency accepts strings
getCurrency('US');
getCurrency('en-US');
getCurrency('zh-Hant-TW');

// Test getLocales return type
const locales: string[] = getLocales('USD');
const euroCountries: string[] = getLocales('EUR');

// Test that getLocales accepts strings
getLocales('USD');
getLocales('EUR');

// Verify string array methods work
const hasUS: boolean = locales.includes('US');
const count: number = locales.length;

// Type narrowing test
if (currency1 !== null) {
    const upperCurrency: string = currency1.toUpperCase();
    console.log(upperCurrency);
}

// @ts-expect-error - getCurrency should not accept numbers
getCurrency(123);

// @ts-expect-error - getLocales should not accept numbers
getLocales(456);

// @ts-expect-error - getCurrency returns string | null, not just string
const mustBeString: string = getCurrency('US');

console.log('TypeScript type checks passed!');
