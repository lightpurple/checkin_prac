import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import Login from "../controllers/UserController";
import Strategy42 from "../middleware/strategy";
import validate from "../middleware/validate";
import jwt from "../middleware/jwt";

export const path = "/users";
export const router = Router();

passport.use(Strategy42());

router.get("/", Login.loginPage); // 기본 로그인 페이지
router.get("/show", Login.getUser); // 임시
router.get("/login", passport.authenticate("42")); // 42 Oauth
router.get(
    // 42 Oauth Callback
    "/login/callback",
    passport.authenticate("42", { failureRedirect: "/" }),
    jwt.signToken
);
router.get("/regist", validate.isLoggedin, Login.registerPage); // 카드 입력 페이지
router.post("/regist", validate.isLoggedin, Login.registCard); // User모델에 card_num 업데이트
router.get("/logout", validate.isLoggedin, Login.logOut); // User모델에 card_num 업데이트
