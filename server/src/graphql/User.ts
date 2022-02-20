import { getGraphQLRateLimiter } from "graphql-rate-limit";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cache } from "../util/cache";
import { credential } from "../service.types";
import { objectType, extendType, inputObjectType, scalarType } from "nexus";

let JWT_SECRET = process.env.JWT_SECRET as string;

const rateLimiter = getGraphQLRateLimiter({ identifyContext: (ctx) => ctx.id });

export const LoginInputType = inputObjectType({
    name: "LoginInputType",
    definition(t) {
        t.nonNull.string("username");
        t.nonNull.string("password");
    },
});

export const LoginPayload = objectType({
    name: "LoginPayload",
    definition(t) {
        t.string("token");
    },
});

export const LoginMutation = extendType({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", {
            type: LoginPayload,
            args: {
                data: LoginInputType,
            },
            resolve: async (_root, args, context, info) => {
                const { username, password } = args.data as credential;

                const errorMessage = await rateLimiter(
                    { parent: {}, args, context, info },
                    { max: 5, window: "15s" },
                );
                if (errorMessage) throw new Error(errorMessage);

                let { username: userName, password: userPassword } = cache.get(
                    "user",
                ) as credential;

                if (
                    bcrypt.compareSync(password, userPassword) &&
                    userName === username
                ) {
                    return {
                        token: jwt.sign({ userName, userPassword }, JWT_SECRET),
                    };
                } else {
                    throw new Error("Unable to Login");
                }
            },
        });
    },
});
