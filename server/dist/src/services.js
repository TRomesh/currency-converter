"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExchangeRates = exports.getCountryDetails = exports.getAllCountries = exports.countriesURL = exports.fixerURL = void 0;
const axios_1 = __importDefault(require("axios"));
const access_key = process.env.API_KEY;
exports.fixerURL = "http://data.fixer.io/api/latest";
exports.countriesURL = "https://restcountries.com/v3.1";
const getAllCountries = () => {
    return axios_1.default.get(`${exports.countriesURL}/all`);
};
exports.getAllCountries = getAllCountries;
const getCountryDetails = (country_codes) => {
    return axios_1.default.get(`${exports.countriesURL}/alpha?codes=${country_codes.toString()}`, {});
};
exports.getCountryDetails = getCountryDetails;
const getExchangeRates = (currency_codes) => {
    return axios_1.default.get(`${exports.fixerURL}?access_key=${access_key}&symbols=${currency_codes.toString()}`, {});
};
exports.getExchangeRates = getExchangeRates;
//# sourceMappingURL=services.js.map