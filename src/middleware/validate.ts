import { NextFunction, Request, Response } from "express";
import { db } from "../models";
import jwt from "./jwt";

export default {
    isLoggedin: (req: any, res: Response, next: NextFunction) => {
        jwt.isTokenExist(req, res, next);
        next();
    },
    isUserExist: async (token: string, rt: string, profile: any) => {
        try {
            if (profile._json.cursus_users.length < 2) {
                return false;
            } else {
                const [user, create] = await db.User.findOrCreate({
                    where: { intra_id: profile.username },
                    default: { is_using: true },
                });
                return user;
            }
        } catch (e) {
            return false;
        }
    },
};
