"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.path = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
exports.path = "/users";
exports.router = (0, express_1.Router)();
exports.router.get("/", UserController_1.default.doGetUser);
exports.router.post("regist", UserController_1.default.doRegistUser);
exports.router.get("/42", passport_1.default.authenticate("42"));
exports.router.get("/42/callback", passport_1.default.authenticate("42", { failureRedirect: "/users/regist" }), (req, res) => {
    // Successful authentication, redirect home.
    res.redirect("/users");
});
//# sourceMappingURL=user.js.map