"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginMutation = exports.LoginPayload = exports.LoginInputType = void 0;
const graphql_rate_limit_1 = require("graphql-rate-limit");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cache_1 = require("../util/cache");
const nexus_1 = require("nexus");
let JWT_SECRET = process.env.JWT_SECRET;
const rateLimiter = (0, graphql_rate_limit_1.getGraphQLRateLimiter)({ identifyContext: (ctx) => ctx.id });
exports.LoginInputType = (0, nexus_1.inputObjectType)({
    name: "LoginInputType",
    definition(t) {
        t.nonNull.string("username");
        t.nonNull.string("password");
    },
});
exports.LoginPayload = (0, nexus_1.objectType)({
    name: "LoginPayload",
    definition(t) {
        t.string("token");
    },
});
exports.LoginMutation = (0, nexus_1.extendType)({
    type: "Mutation",
    definition(t) {
        t.nonNull.field("login", {
            type: exports.LoginPayload,
            args: {
                data: exports.LoginInputType,
            },
            resolve: async (_root, args, context, info) => {
                const { username, password } = args.data;
                const errorMessage = await rateLimiter({ parent: {}, args, context, info }, { max: 30, window: "60s" });
                if (errorMessage)
                    throw new Error(errorMessage);
                let { username: userName, password: userPassword } = cache_1.cache.get("user");
                if (bcrypt_1.default.compareSync(password, userPassword) &&
                    userName === username) {
                    return {
                        token: jsonwebtoken_1.default.sign({ userName, userPassword }, JWT_SECRET),
                    };
                }
                else {
                    throw new Error("Unable to Login, Please check username and password combination");
                }
            },
        });
    },
});
//# sourceMappingURL=User.js.map