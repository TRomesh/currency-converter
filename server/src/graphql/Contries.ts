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
        t.nonNull.string("code");
        t.nonNull.float("amount");
        t.nonNull.string("cca2");
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
        t.float("amount");
        t.string("cca2");
        t.string("code");
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

                        if (cached_currencies) {
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
                    let cached_currencies = cache.get(
                        "currencies",
                    ) as currency_type;

                    let currencies: currency_type = {};

                    if (cached_currencies) {
                        currencies = cached_currencies;
                    } else {
                        let {
                            data: { rates },
                        }: AxiosResponse = await getExchangeRates([
                            args.data?.code as string,
                            "SEK",
                        ]);
                        currencies = rates;
                    }
                    let base = "SEK" as keyof typeof currencies;
                    let code = args.data?.code as keyof typeof currencies;

                    if (
                        args.data?.cca2 &&
                        args.data?.code &&
                        args.data?.amount
                    ) {
                        return {
                            amount:
                                (currencies[base] / currencies[code]) *
                                args.data?.amount,
                            code: args.data?.code,
                            cca2: args.data?.cca2,
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
