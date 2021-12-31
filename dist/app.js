"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const app = require("express")();
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("./middleware/logger");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const Api = __importStar(require("./routes/routes"));
const port = process.env.PORT || 3000;
app.set("views", path_1.default.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use((0, express_1.json)());
app.use((0, express_1.urlencoded)({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(cls_rtracer_1.default.expressMiddleware()); // 로그 식별용
app.use(passport_1.default.initialize());
// app.use(passport.session());
app.use((req, res, next) => {
    const { method, path, url, query, headers: { cookie }, body, } = req;
    const request = { method, path, cookie, body, url, query };
    logger_1.logger.info({ request });
    next();
});
app.use(Api.path, Api.router);
app.get("/", (req, res) => res.send("Welcome to checkin project!"));
app.listen(port, () => console.log(`Server running on port ${port}`));
//# sourceMappingURL=app.js.map