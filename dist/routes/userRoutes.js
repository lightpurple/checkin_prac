"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.path = void 0;
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const UserController_1 = __importDefault(require("../controllers/UserController"));
const strategy_1 = __importDefault(require("../middleware/strategy"));
const validate_1 = __importDefault(require("../middleware/validate"));
const jwt_1 = __importDefault(require("../middleware/jwt"));
exports.path = "/users";
exports.router = (0, express_1.Router)();
passport_1.default.use((0, strategy_1.default)());
exports.router.get("/", UserController_1.default.loginPage); // 기본 로그인 페이지
exports.router.get("/show", UserController_1.default.getUser);
exports.router.get("/login", passport_1.default.authenticate("42")); // 42 Oauth
exports.router.get(
// 42 Oauth Callback
"/login/callback", passport_1.default.authenticate("42", { failureRedirect: "/" }), jwt_1.default.signToken);
exports.router.get("/regist", validate_1.default.isLoggedin, UserController_1.default.registerPage); // 카드 입력 페이지
exports.router.post("/regist", validate_1.default.isLoggedin, UserController_1.default.registCard); // User모델에 card_num 업데이트
//# sourceMappingURL=userRoutes.js.map