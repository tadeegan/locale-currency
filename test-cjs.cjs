// CommonJS dynamic import test
// Tests that ES modules can be imported from CommonJS contexts using dynamic import()
(async () => {
    const { getCurrency, getLocales } = await import('./index.js');

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

    console.log('✓ CommonJS dynamic import test passed');
})();
