import passport from "passport";
import validate from "../middleware/validate";

let FortyTwoStrategy = require("passport-42").Strategy;

const StrategyCallback = (token: string, rt: string, profile: any, cb: any) => {
    validate
        .isUserExist(token, rt, profile)
        .then((user) => {
            cb(null, user);
        })
        .catch((e) => {
            cb(e);
        });
};

const Strategy42 = () =>
    new FortyTwoStrategy(
        {
            clientID: process.env.FORTYTWO_APP_ID,
            clientSecret: process.env.FORTYTWO_APP_SECRET,
            callbackURL: "http://localhost:3000/users/login/callback",
        },
        StrategyCallback
    );

passport.serializeUser(function (user, done) {
    done(null, user);
}); // 세션에 저장하는건데 app.ts에서 passport.sesstion()을 하지않았는데..?

passport.deserializeUser(function (user, done) {
    done(null, user);
});

export default Strategy42;
