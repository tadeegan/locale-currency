// CommonJS dynamic import test
// Tests that ES modules can be imported from CommonJS contexts using dynamic import()
(async () => {
    const { getCurrency, getLocales, getExponentForCurrency, convertToSmallestCurrencyUnit } = await import('./index.js');

    // Test getCurrency
    const usdCurrency = getCurrency('en-US');
    if (usdCurrency !== 'USD') {
        throw new Error(`Expected USD, got ${usdCurrency}`);
    }

    // Test getLocales
    const usdLocales = getLocales('USD');
    if (!usdLocales.includes('US')) {
        throw new Error(`Expected US in locales, got ${usdLocales}`);
    }

    // Test BCP 47 format
    const twdCurrency = getCurrency('zh-Hant-TW');
    if (twdCurrency !== 'TWD') {
        throw new Error(`Expected TWD, got ${twdCurrency}`);
    }

    // Test currency decimals
    if (getExponentForCurrency('JPY') !== 0) {
        throw new Error(`Expected 0, got ${getExponentForCurrency('JPY')}`);
    }
    if (convertToSmallestCurrencyUnit(10.99, 'USD') !== 1099) {
        throw new Error(`Expected 1099, got ${convertToSmallestCurrencyUnit(10.99, 'USD')}`);
    }

    // Test subpath import
    const decimals = await import('./currency-decimals.js');
    if (decimals.getExponentForCurrency('KWD') !== 3) {
        throw new Error(`Expected 3, got ${decimals.getExponentForCurrency('KWD')}`);
    }

    console.log('✓ CommonJS dynamic import test passed');
})();
