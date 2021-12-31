"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const validate_1 = __importDefault(require("../middleware/validate"));
let FortyTwoStrategy = require("passport-42").Strategy;
const StrategyCallback = (token, rt, profile, cb) => {
    validate_1.default
        .isUserExist(token, rt, profile)
        .then((user) => {
        cb(null, user);
    })
        .catch((e) => {
        cb(e);
    });
};
const Strategy42 = () => new FortyTwoStrategy({
    clientID: process.env.FORTYTWO_APP_ID,
    clientSecret: process.env.FORTYTWO_APP_SECRET,
    callbackURL: "http://localhost:3000/users/login/callback",
}, StrategyCallback);
passport_1.default.serializeUser(function (user, done) {
    done(null, user);
}); // 세션에 저장하는건데 app.ts에서 passport.sesstion()을 하지않았는데..?
passport_1.default.deserializeUser(function (user, done) {
    done(null, user);
});
exports.default = Strategy42;
//# sourceMappingURL=strategy.js.map