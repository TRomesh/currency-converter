import axios, { AxiosResponse } from "axios";
import { country_type, exchange_response } from "./service.types";
const access_key = process.env.API_KEY;
export const fixerURL: string = "http://data.fixer.io/api/latest";
export const countriesURL: string = "https://restcountries.com/v3.1";

export const getAllCountries = (): Promise<AxiosResponse<country_type[]>> => {
    return axios.get(`${countriesURL}/all`);
};

export const getCountryDetails = (
    country_codes: string[],
): Promise<AxiosResponse<country_type[]>> => {
    return axios.get(
        `${countriesURL}/alpha?codes=${country_codes.toString()}`,
        {},
    );
};

export const getExchangeRates = (
    currency_codes: string[],
): Promise<AxiosResponse<exchange_response>> => {
    return axios.get(
        `${fixerURL}?access_key=${access_key}&symbols=${currency_codes.toString()}`,
        {},
    );
};
