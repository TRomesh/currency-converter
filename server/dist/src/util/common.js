"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConvertedAmounts = exports.addCurrunciesToCountries = exports.getCurrencyDifference = exports.getCurrunciesFromCountries = void 0;
/**
 * get currencies from country
 * @param countries
 * @returns [string] currencies
 */
const getCurrunciesFromCountries = (countries) => {
    return countries.length > 0
        ? countries
            .map((country) => country === null || country === void 0 ? void 0 : country.currencies)
            .map((currency) => Object.keys(currency))
            .flat()
        : [];
};
exports.getCurrunciesFromCountries = getCurrunciesFromCountries;
/**
 * check if country currency is in the cached currencies
 * @param country_currencies  currencies
 * @param currencies chached currencies
 * @returns
 */
const getCurrencyDifference = (country_currencies, currencies) => {
    if (currencies && Object.keys(currencies).length > 0) {
        let currency_array = new Set(Object.keys(currencies));
        return [...country_currencies].filter((v) => !currency_array.delete(v));
    }
};
exports.getCurrencyDifference = getCurrencyDifference;
/**
 * add currencies to countries
 * @param countries
 * @param currencies
 * @returns [countries]
 */
const addCurrunciesToCountries = (countries, currencies) => {
    return countries.map((country) => {
        let country_keys = Object.keys(country.currencies);
        let base = "SEK";
        return {
            ...country,
            rates: country_keys.map((key) => {
                if (currencies[key]) {
                    return {
                        [key]: currencies[base] /
                            currencies[key],
                    };
                }
                else {
                    return {
                        [key]: 0,
                    };
                }
            }),
        };
    });
};
exports.addCurrunciesToCountries = addCurrunciesToCountries;
/**
 * convert currencies from SEK to local
 * @param countries countries
 * @param currencies currencies
 * @param amount SEK amout
 * @returns [rates]
 */
const getConvertedAmounts = (countries, currencies, amount) => {
    return countries.map((country) => {
        let country_keys = Object.keys(country.currencies);
        let base = "SEK";
        return country_keys.map((key) => {
            if (currencies[key]) {
                return {
                    [key]: (currencies[key] /
                        currencies[base]) *
                        amount,
                };
            }
            else {
                return {
                    [key]: 0,
                };
            }
        });
    });
};
exports.getConvertedAmounts = getConvertedAmounts;
//# sourceMappingURL=common.js.map