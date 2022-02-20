import "dotenv/config";
import cron from "node-cron";
import bcrypt from "bcrypt";
import { getUser } from "./util/context";
import { cache } from "./util/cache";
import { getAllCountries } from "./services";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";

const init = async () => {
    let { data: countries } = await getAllCountries();
    // cache all countries
    cache.set("countries", countries, 300);
    // Keep the user object in memory forever
    cache.set(
        "user",
        {
            username: "adam",
            password: bcrypt.hashSync("12345", 3),
        },
        0,
    );
};

import { schema } from "./schema";
export const server = new ApolloServer({
    schema,
    context: async ({ req }) => {
        try {
            return await getUser(req.headers.authorization as string);
        } catch (error) {
            return null;
        }
    },
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

cron.schedule("0 */5 * * * *", async () => {
    console.log("running every minute 5");
});

const port = 3000 || process.env.PORT;

server.listen({ port }).then(async ({ url }) => {
    init();
    console.log(`🚀  Server ready at ${url}`);
});
