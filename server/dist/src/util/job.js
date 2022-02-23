"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshCache = void 0;
const services_1 = require("../services");
const cache_1 = require("./cache");
// Refetch currency data
const refreshCache = async () => {
    let cached_currencies = cache_1.cache.get("currencies");
    if (cached_currencies) {
        let currency_codes = Object.keys(cached_currencies);
        let { data: { rates }, } = await (0, services_1.getExchangeRates)([...currency_codes, "SEK"]);
        cache_1.cache.set("currencies", rates, 300);
    }
};
exports.refreshCache = refreshCache;
//# sourceMappingURL=job.js.map