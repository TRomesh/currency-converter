import { country_type, currency_type } from "../service.types";
import {
    addCurrunciesToCountries,
    getCurrunciesFromCountries,
} from "../util/common";

let Countries: country_type[] = [
    {
        cca2: "AU",
        currencies: {
            AUD: {
                name: "",
                symbol: "",
            },
        },
        name: {
            common: "",
            official: "",
        },
        population: 0,
    },
    {
        cca2: "SW",
        currencies: {
            SEK: {
                name: "",
                symbol: "",
            },
        },
        name: {
            common: "",
            official: "",
        },
        population: 0,
    },
    {
        cca2: "LK",
        currencies: {
            LKR: {
                name: "",
                symbol: "",
            },
        },
        name: {
            common: "",
            official: "",
        },
        population: 0,
    },
];

let Currencies: currency_type = { AUD: 6.74, SEK: 1, LKR: 0.046 };

describe("Testing addCurrunciesToCountries Common Function", () => {
    it("should return an array countries with rates attribute", async () => {
        let new_countries = addCurrunciesToCountries(Countries, Currencies);
        expect(new_countries[0]).toHaveProperty("rates");
    });
    it("should return an array countries with rates in SEK", async () => {
        let new_countries = addCurrunciesToCountries(Countries, Currencies);
        expect(new_countries[0].rates[0]).toEqual({ AUD: 0.14836795252225518 });
    });
});

describe("Testing getCurrunciesFromCountries Common Function", () => {
    it("should return an array of currencies", async () => {
        let country_currencies = getCurrunciesFromCountries(Countries);
        expect(country_currencies).toEqual(["AUD", "SEK", "LKR"]);
    });
    it("should return an empty array", async () => {
        let country_currencies = getCurrunciesFromCountries([]);
        expect(country_currencies).toEqual([]);
    });
});
