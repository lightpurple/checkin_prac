import { NextFunction, Response } from "express";
import * as jwt from "jsonwebtoken";

export default {
    isTokenExist: (req: any, res: Response, next: NextFunction) => {
        const token = req.cookies.user;

        if (!token) {
            // 토큰이 없을 때
            return res.status(403).json({
                msg: "No token provided!",
            });
        }

        jwt.verify(token, process.env.JWT_SECRET, (err: any, decoded: any) => {
            if (err) {
                // 토큰이 유효하지 않을 때
                return res.status(401).json({
                    msg: "Token is invalid!",
                });
            }
            req.decoded = decoded;
        });
    },
    signToken: (req: any, res: Response, next: NextFunction) => {
        // 토큰에 담는 정보
        jwt.sign(
            { username: req.user.intra_id },
            process.env.JWT_SECRET,
            { expiresIn: 60 * 60 * 24 * 7 }, // 토큰 만료 기간 7일
            (err, token) => {
                if (err) {
                    throw err;
                }
                res.cookie("user", token, {
                    maxAge: 24 * 60 * 60 * 7,
                }).redirect("/users/regist"); // 'user' 명을 가진 쿠키
            }
        );
    },
};
