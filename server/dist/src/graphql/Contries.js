"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountryMutation = exports.CountryQuery = exports.Conversion = exports.CountryList = exports.Country = exports.ConvertInputType = exports.DetailInputType = void 0;
const cache_1 = require("../util/cache");
const graphql_type_json_1 = require("graphql-type-json");
const services_1 = require("../services");
const common_1 = require("../util/common");
const graphql_rate_limit_1 = require("graphql-rate-limit");
const nexus_1 = require("nexus");
const rateLimiter = (0, graphql_rate_limit_1.getGraphQLRateLimiter)({ identifyContext: (ctx) => ctx.id });
const CountryName = (0, nexus_1.objectType)({
    name: "CountryName",
    definition(t) {
        t.string("common");
        t.string("official");
    },
});
const ConversionField = (0, nexus_1.objectType)({
    name: "ConversionField",
    definition(t) {
        t.string("currency");
        t.float("rate");
    },
});
const Currency_Scalar = (0, nexus_1.scalarType)({
    name: "JSON",
    serialize: graphql_type_json_1.GraphQLJSONObject.serialize,
    parseValue: graphql_type_json_1.GraphQLJSONObject.parseValue,
    parseLiteral: graphql_type_json_1.GraphQLJSONObject.parseLiteral,
});
exports.DetailInputType = (0, nexus_1.inputObjectType)({
    name: "DetailInputType",
    definition(t) {
        t.list.nonNull.string("codes");
    },
});
exports.ConvertInputType = (0, nexus_1.inputObjectType)({
    name: "ConvertInputType",
    definition(t) {
        t.list.nonNull.string("codes");
        t.nonNull.float("amount");
    },
});
exports.Country = (0, nexus_1.objectType)({
    name: "Country",
    definition(t) {
        t.field("name", { type: CountryName });
        t.int("population");
        t.string("cca2");
        t.string("common", { resolve: (root) => { var _a; return ((_a = root.name) === null || _a === void 0 ? void 0 : _a.common) || ""; } });
        t.string("official", { resolve: (root) => { var _a; return ((_a = root.name) === null || _a === void 0 ? void 0 : _a.official) || ""; } });
        t.field("currencies", {
            type: Currency_Scalar,
        });
        t.list.field("rates", {
            type: Currency_Scalar,
        });
    },
});
exports.CountryList = (0, nexus_1.objectType)({
    name: "CountryList",
    definition(t) {
        t.field("name", { type: CountryName });
        t.string("cca2");
        t.string("common", { resolve: (root) => { var _a; return ((_a = root.name) === null || _a === void 0 ? void 0 : _a.common) || ""; } });
    },
});
exports.Conversion = (0, nexus_1.objectType)({
    name: "Conversion",
    definition(t) {
        t.field("conversion", {
            type: Currency_Scalar,
        });
    },
});
exports.CountryQuery = (0, nexus_1.extendType)({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("country_list", {
            type: "CountryList",
            resolve: async (_root, _args, context, _info) => {
                if (context.user) {
                    let cached_countries = cache_1.cache.get("countries");
                    if (cached_countries) {
                        return cached_countries;
                    }
                    else {
                        let { data } = await (0, services_1.getAllCountries)();
                        return data;
                    }
                }
                else {
                    throw new Error("Unauthorized");
                }
            },
        });
    },
});
exports.CountryMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.list.field("country_details", {
            type: "Country",
            args: { data: exports.DetailInputType },
            resolve: async (_, args, context) => {
                var _a, _b;
                if (context.user) {
                    if ((_a = args.data) === null || _a === void 0 ? void 0 : _a.codes) {
                        let cached_countries = cache_1.cache.get("countries");
                        let cached_currencies = cache_1.cache.get("currencies");
                        let countries = [];
                        let currencies = {};
                        if (cached_countries) {
                            countries = cached_countries.filter((country) => { var _a, _b; return (_b = (_a = args.data) === null || _a === void 0 ? void 0 : _a.codes) === null || _b === void 0 ? void 0 : _b.includes(country.cca2); });
                        }
                        else {
                            let { data } = await (0, services_1.getCountryDetails)((_b = args.data) === null || _b === void 0 ? void 0 : _b.codes);
                            countries = data;
                        }
                        let country_currencies = (0, common_1.getCurrunciesFromCountries)(countries);
                        let currency_diff = (0, common_1.getCurrencyDifference)(country_currencies, cached_currencies);
                        if (cached_currencies && (currency_diff === null || currency_diff === void 0 ? void 0 : currency_diff.length) === 0) {
                            currencies = cached_currencies;
                        }
                        else {
                            let { data: { rates }, } = await (0, services_1.getExchangeRates)([
                                ...country_currencies,
                                "SEK",
                            ]);
                            cache_1.cache.set("currencies", rates, 300);
                            currencies = rates;
                        }
                        return (0, common_1.addCurrunciesToCountries)(countries, currencies);
                    }
                    else {
                        throw new Error("Invalid Parameters");
                    }
                }
                else {
                    throw new Error("Unauthorized");
                }
            },
        });
        t.nonNull.field("convert", {
            type: "Conversion",
            args: { data: exports.ConvertInputType },
            resolve: async (_, args, context) => {
                var _a, _b, _c;
                if (context.user) {
                    if ((_a = args.data) === null || _a === void 0 ? void 0 : _a.codes) {
                        let cached_countries = cache_1.cache.get("countries");
                        let cached_currencies = cache_1.cache.get("currencies");
                        let countries = [];
                        let currencies = {};
                        if (cached_countries) {
                            countries = cached_countries.filter((country) => { var _a, _b; return (_b = (_a = args.data) === null || _a === void 0 ? void 0 : _a.codes) === null || _b === void 0 ? void 0 : _b.includes(country.cca2); });
                        }
                        else {
                            let { data } = await (0, services_1.getCountryDetails)((_b = args.data) === null || _b === void 0 ? void 0 : _b.codes);
                            countries = data;
                        }
                        let country_currencies = (0, common_1.getCurrunciesFromCountries)(countries);
                        let currency_diff = (0, common_1.getCurrencyDifference)(country_currencies, cached_currencies);
                        if (cached_currencies && (currency_diff === null || currency_diff === void 0 ? void 0 : currency_diff.length) === 0) {
                            currencies = cached_currencies;
                        }
                        else {
                            let { data: { rates }, } = await (0, services_1.getExchangeRates)([
                                ...country_currencies,
                                "SEK",
                            ]);
                            cache_1.cache.set("currencies", rates, 300);
                            currencies = rates;
                        }
                        let result = (0, common_1.getConvertedAmounts)(countries, currencies, (_c = args.data) === null || _c === void 0 ? void 0 : _c.amount);
                        return {
                            conversion: { result },
                        };
                    }
                    else {
                        throw new Error("Invalid Parameters");
                    }
                }
                else {
                    throw new Error("Unauthorized");
                }
            },
        });
    },
});
//# sourceMappingURL=Contries.js.map