"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
require("dotenv/config");
const node_cron_1 = __importDefault(require("node-cron"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = require("./schema");
const context_1 = require("./util/context");
const cache_1 = require("./util/cache");
const job_1 = require("./util/job");
const services_1 = require("./services");
const apollo_server_1 = require("apollo-server");
const apollo_server_core_1 = require("apollo-server-core");
const init = async () => {
    let { data: countries } = await (0, services_1.getAllCountries)();
    // cache all countries
    cache_1.cache.set("countries", countries, 300);
    // Keep the user object in memory forever
    cache_1.cache.set("user", {
        username: "adam",
        password: bcrypt_1.default.hashSync("12345", 3),
    }, 0);
};
exports.server = new apollo_server_1.ApolloServer({
    schema: schema_1.schema,
    context: async ({ req }) => {
        try {
            return await (0, context_1.getUser)(req.headers.authorization);
        }
        catch (error) {
            return null;
        }
    },
    plugins: [(0, apollo_server_core_1.ApolloServerPluginLandingPageGraphQLPlayground)()],
});
// Refetch currency data every 2mins
node_cron_1.default.schedule("0 */2 * * * *", async () => {
    (0, job_1.refreshCache)();
});
const port = process.env.PORT || 3000;
exports.server.listen({ port }).then(async ({ url }) => {
    init();
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map