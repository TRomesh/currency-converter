import axios from "axios";
import {
    countriesURL,
    getAllCountries,
    getExchangeRates,
    getCountryDetails,
} from "../services";
import { country_type, currency_type } from "../service.types";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

let Countries: country_type[] = [
    {
        cca2: "",
        currencies: {
            "": {
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
        cca2: "",
        currencies: {
            "": {
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
        cca2: "",
        currencies: {
            "": {
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

let Currencies: currency_type = { AUD: 1.2334, SEK: 0.8976 };

describe("Testing getAllCountries service", () => {
    it("should return an array countries with rates in SEK", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: Countries });
        const { data } = await getAllCountries();
        expect(axios.get).toHaveBeenCalledWith(`${countriesURL}/all`);
        expect(data).toBe(Countries);
    });
});

describe("Testing getCountryDetails service", () => {
    it("should return an array of currencies", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: Countries });
        const { data } = await getCountryDetails(["AU", "LK"]);
        expect(axios.get).toHaveBeenCalled();
        expect(data).toBe(Countries);
    });
});

describe("Testing getExchangeRates service", () => {
    it("should return an array of currencies", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: Currencies });
        const { data } = await getExchangeRates(["AUD", "SEK"]);
        expect(axios.get).toHaveBeenCalled();
        expect(data).toBe(Currencies);
    });
});
