"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cache_1 = require("../util/cache");
let JWT_SECRET = process.env.JWT_SECRET;
/**
 * validate/verify token and send user instance
 * @param token
 * @returns {User}
 */
const getUser = async (token) => {
    if (token && token.length > 6) {
        const { ok, result } = await new Promise((resolve) => jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, result) => {
            if (err) {
                resolve({
                    ok: false,
                    result: err,
                });
            }
            else {
                resolve({
                    ok: true,
                    result,
                });
            }
        }));
        if (ok) {
            let user = cache_1.cache.get("user");
            return { user };
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};
exports.getUser = getUser;
//# sourceMappingURL=context.js.map