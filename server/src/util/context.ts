import jwt from "jsonwebtoken";
import { credential } from "../service.types";
import { cache } from "../util/cache";

let JWT_SECRET = process.env.JWT_SECRET as string;

/**
 * validate/verify token and send user instance
 * @param token
 * @returns {User}
 */
export const getUser = async (token: string) => {
    if (token && token.length > 6) {
        const { ok, result } = await new Promise((resolve) =>
            jwt.verify(token, JWT_SECRET, (err, result) => {
                if (err) {
                    resolve({
                        ok: false,
                        result: err,
                    });
                } else {
                    resolve({
                        ok: true,
                        result,
                    });
                }
            }),
        );

        if (ok) {
            let user = cache.get("user") as credential;
            return { user };
        } else {
            return null;
        }
    } else {
        return null;
    }
};
