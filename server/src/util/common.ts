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
                }
            }),
        };
    });
};
