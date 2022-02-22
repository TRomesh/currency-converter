import { country_type, currency_type } from "../service.types";

/**
 * get currencies from country
 * @param countries
 * @returns [string] currencies
 */
export const getCurrunciesFromCountries = (countries: country_type[]) => {
    return countries.length > 0
        ? countries
              .map((country: any) => country?.currencies)
              .map((currency: any) => Object.keys(currency))
              .flat()
        : [];
};

/**
 * check if country currency is in the cached currencies
 * @param country_currencies  currencies
 * @param currencies chached currencies
 * @returns
 */
export const getCurrencyDifference = (
    country_currencies: string[],
    currencies: currency_type,
) => {
    if (currencies && Object.keys(currencies).length > 0) {
        let currency_array = new Set(Object.keys(currencies));
        return [...country_currencies].filter((v) => !currency_array.delete(v));
    }
};

/**
 * add currencies to countries
 * @param countries
 * @param currencies
 * @returns [countries]
 */
export const addCurrunciesToCountries = (
    countries: country_type[],
    currencies: currency_type,
) => {
    return countries.map((country: country_type) => {
        let country_keys = Object.keys(country.currencies);
        let base = "SEK" as keyof typeof currencies;
        return {
            ...country,
            rates: country_keys.map((key) => {
                if (currencies[key as keyof typeof currencies]) {
                    return {
                        [key]:
                            currencies[base] /
                            currencies[key as keyof typeof currencies],
                    };
                } else {
                    return {
                        [key]: 0,
                    };
                }
            }),
        };
    });
};

/**
 * convert currencies from SEK to local
 * @param countries countries
 * @param currencies currencies
 * @param amount SEK amout
 * @returns [rates]
 */
export const getConvertedAmounts = (
    countries: country_type[],
    currencies: currency_type,
    amount: number,
) => {
    return countries.map((country: country_type) => {
        let country_keys = Object.keys(country.currencies);
        let base = "SEK" as keyof typeof currencies;
        return country_keys.map((key) => {
            if (currencies[key as keyof typeof currencies]) {
                return {
                    [key]:
                        (currencies[key as keyof typeof currencies] /
                            currencies[base]) *
                        amount,
                };
            } else {
                return {
                    [key]: 0,
                };
            }
        });
    });
};
