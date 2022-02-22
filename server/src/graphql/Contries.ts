import { cache } from "../util/cache";
import { GraphQLJSONObject } from "graphql-type-json";
import { AxiosResponse } from "axios";
import {
    getAllCountries,
    getCountryDetails,
    getExchangeRates,
} from "../services";
import {
    addCurrunciesToCountries,
    getCurrunciesFromCountries,
    getCurrencyDifference,
    getConvertedAmounts,
} from "../util/common";
import { getGraphQLRateLimiter } from "graphql-rate-limit";
import { country_type, currency_type } from "../service.types";
import { objectType, extendType, inputObjectType, scalarType } from "nexus";

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

const CountryName = objectType({
    name: "CountryName",
    definition(t) {
        t.string("common");
        t.string("official");
    },
});

const ConversionField = objectType({
    name: "ConversionField",
    definition(t) {
        t.string("currency");
        t.float("rate");
    },
});

const Currency_Scalar = scalarType({
    name: "JSON",
    serialize: GraphQLJSONObject.serialize,
    parseValue: GraphQLJSONObject.parseValue,
    parseLiteral: GraphQLJSONObject.parseLiteral,
});

export const DetailInputType = inputObjectType({
    name: "DetailInputType",
    definition(t) {
        t.list.nonNull.string("codes");
    },
});

export const ConvertInputType = inputObjectType({
    name: "ConvertInputType",
    definition(t) {
        t.list.nonNull.string("codes");
        t.nonNull.float("amount");
    },
});

export const Country = objectType({
    name: "Country",
    definition(t) {
        t.field("name", { type: CountryName });
        t.int("population");
        t.string("cca2");
        t.string("common", { resolve: (root) => root.name?.common || "" });
        t.string("official", { resolve: (root) => root.name?.official || "" });
        t.field("currencies", {
            type: Currency_Scalar,
        });
        t.list.field("rates", {
            type: Currency_Scalar,
        });
    },
});

export const CountryList = objectType({
    name: "CountryList",
    definition(t) {
        t.field("name", { type: CountryName });
        t.string("cca2");
        t.string("common", { resolve: (root) => root.name?.common || "" });
    },
});

export const Conversion = objectType({
    name: "Conversion",
    definition(t) {
        t.field("conversion", {
            type: Currency_Scalar,
        });
    },
});

export const CountryQuery = extendType({
    type: "Query",
    definition(t) {
        t.nonNull.list.field("country_list", {
            type: "CountryList",
            resolve: async (_root, _args, context, _info) => {
                if (context.user) {
                    let cached_countries = cache.get("countries");
                    if (cached_countries) {
                        return cached_countries;
                    } else {
                        let { data }: AxiosResponse = await getAllCountries();
                        return data;
                    }
                } else {
                    throw new Error("Unauthorized");
                }
            },
        });
    },
});

export const CountryMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.list.field("country_details", {
            type: "Country",
            args: { data: DetailInputType },
            resolve: async (_, args, context) => {
                if (context.user) {
                    if (args.data?.codes) {
                        let cached_countries = cache.get(
                            "countries",
                        ) as country_type[];

                        let cached_currencies = cache.get(
                            "currencies",
                        ) as currency_type;

                        let countries: country_type[] = [];
                        let currencies: currency_type = {};

                        if (cached_countries) {
                            countries = cached_countries.filter((country) =>
                                args.data?.codes?.includes(country.cca2),
                            );
                        } else {
                            let { data }: AxiosResponse =
                                await getCountryDetails(args.data?.codes);

                            countries = data;
                        }

                        let country_currencies =
                            getCurrunciesFromCountries(countries);

                        let currency_diff = getCurrencyDifference(
                            country_currencies,
                            cached_currencies,
                        );

                        if (cached_currencies && currency_diff?.length === 0) {
                            currencies = cached_currencies;
                        } else {
                            let {
                                data: { rates },
                            }: AxiosResponse = await getExchangeRates([
                                ...country_currencies,
                                "SEK",
                            ]);
                            cache.set("currencies", rates, 300);
                            currencies = rates;
                        }
                        return addCurrunciesToCountries(countries, currencies);
                    } else {
                        throw new Error("Invalid Parameters");
                    }
                } else {
                    throw new Error("Unauthorized");
                }
            },
        });

        t.nonNull.field("convert", {
            type: "Conversion",
            args: { data: ConvertInputType },
            resolve: async (_, args, context) => {
                if (context.user) {
                    if (args.data?.codes) {
                        let cached_countries = cache.get(
                            "countries",
                        ) as country_type[];

                        let cached_currencies = cache.get(
                            "currencies",
                        ) as currency_type;

                        let countries: country_type[] = [];
                        let currencies: currency_type = {};

                        if (cached_countries) {
                            countries = cached_countries.filter((country) =>
                                args.data?.codes?.includes(country.cca2),
                            );
                        } else {
                            let { data }: AxiosResponse =
                                await getCountryDetails(args.data?.codes);

                            countries = data;
                        }

                        let country_currencies =
                            getCurrunciesFromCountries(countries);

                        let currency_diff = getCurrencyDifference(
                            country_currencies,
                            cached_currencies,
                        );

                        if (cached_currencies && currency_diff?.length === 0) {
                            currencies = cached_currencies;
                        } else {
                            let {
                                data: { rates },
                            }: AxiosResponse = await getExchangeRates([
                                ...country_currencies,
                                "SEK",
                            ]);
                            cache.set("currencies", rates, 300);
                            currencies = rates;
                        }

                        let result = getConvertedAmounts(
                            countries,
                            currencies,
                            args.data?.amount,
                        );

                        return {
                            conversion: { result },
                        };
                    } else {
                        throw new Error("Invalid Parameters");
                    }
                } else {
                    throw new Error("Unauthorized");
                }
            },
        });
    },
});
