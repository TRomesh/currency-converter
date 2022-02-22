import { AxiosResponse } from "axios";
import { currency_type } from "../service.types";
import { getExchangeRates } from "../services";
import { cache } from "./cache";

// Refetch currency data
export const refreshCache = async () => {
    let cached_currencies = cache.get("currencies") as currency_type;
    if (cached_currencies) {
        let currency_codes = Object.keys(cached_currencies);
        let {
            data: { rates },
        }: AxiosResponse = await getExchangeRates([...currency_codes, "SEK"]);
        cache.set("currencies", rates, 300);
    }
};
