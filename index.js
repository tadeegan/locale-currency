var map = require("./map");

var getCountryCode = function(localeString) {
    var components = localeString.split("_");
    if (components.length == 2) {
        return components.pop();
    }
    components = localeString.split("-");
    if (components.length == 2) {
        return components.pop();
    }
    return localeString;
}

exports.getCurrency = function(locale) {
    var countryCode = getCountryCode(locale).toUpperCase();
    if (countryCode in map) {
        return map[countryCode];
    }
    return null;
}

exports.getLocales = function(currencyCode) {
    currencyCode = currencyCode.toUpperCase();
    var locales = [];
    for (countryCode in map) {
        if (map[countryCode] === currencyCode) {
            locales.push(countryCode);
        }
    }
    return locales;
}