import { json, NextFunction, Request, Response, urlencoded } from "express";
const app = require("express")();
import rTracer from "cls-rtracer";
import path from "path";
import { logger } from "./middleware/logger";
import cookieParser from "cookie-parser";
import passport from "passport";
import * as Api from "./routes/routes";

const port = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(rTracer.expressMiddleware()); // 로그 식별용
app.use(passport.initialize());
// app.use(passport.session());
app.use((req: Request, res: Response, next: NextFunction) => {
    const {
        method,
        path,
        url,
        query,
        headers: { cookie },
        body,
    } = req;
    const request = { method, path, cookie, body, url, query };
    logger.info({ request });
    next();
});
app.use(Api.path, Api.router);

app.get("/", (req: Request, res: Response) =>
    res.send("Welcome to checkin project!")
);
app.listen(port, () =>
    console.log(`Server running on http://localhost:${port}/users`)
);
