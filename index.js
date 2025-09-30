import map from "./map.js";

/**
 * Extracts the country/region code from a locale string.
 * Supports BCP 47 (e.g., zh-Hant-TW), i18n (e.g., en_US), and ISO 3166-1 alpha-2 codes.
 * @param {string} localeString - The locale string to parse
 * @returns {string} The country/region code
 */
const getCountryCode = (localeString) => {
    // Handle underscore format (e.g., en_US)
    const underscoreComponents = localeString.split("_");
    if (underscoreComponents.length >= 2) {
        return underscoreComponents[underscoreComponents.length - 1];
    }

    // Handle BCP 47 format (e.g., zh-Hant-TW, en-US)
    // The country/region code is the last component that is 2 characters and uppercase-able
    const dashComponents = localeString.split("-");
    if (dashComponents.length >= 2) {
        // Extract the last component that looks like a country code (2 letters)
        for (let i = dashComponents.length - 1; i >= 0; i--) {
            const component = dashComponents[i];
            if (component.length === 2 && /^[a-zA-Z]{2}$/.test(component)) {
                return component;
            }
        }
    }

    return localeString;
};

/**
 * Get the ISO 4217 currency code for a given locale.
 * @param {string} locale - BCP 47, i18n, or ISO 3166-1 alpha-2 code
 * @returns {string|null} The currency code or null if not found
 */
export const getCurrency = (locale) => {
    const countryCode = getCountryCode(locale).toUpperCase();
    if (countryCode in map) {
        return map[countryCode];
    }
    return null;
};

/**
 * Get all country codes that use a given currency.
 * @param {string} currencyCode - ISO 4217 currency code
 * @returns {string[]} Array of ISO 3166-1 alpha-2 country codes
 */
export const getLocales = (currencyCode) => {
    currencyCode = currencyCode.toUpperCase();
    const locales = [];
    for (const countryCode in map) {
        if (map[countryCode] === currencyCode) {
            locales.push(countryCode);
        }
    }
    return locales;
};
