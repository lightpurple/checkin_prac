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
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
exports.default = {
    isTokenExist: (req, res, next) => {
        console.log(req.cookies);
        const token = req.cookies.user;
        if (!token) {
            // 토큰이 없을 때
            return res.status(403).json({
                msg: "No token provided!",
            });
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                // 토큰이 유효하지 않을 때
                return res.status(401).json({
                    msg: "Token is invalid!",
                });
            }
            req.decoded = decoded;
        });
    },
    signToken: (req, res, next) => {
        // 토큰에 담는 정보
        jwt.sign({ username: req.user.intra_id }, process.env.JWT_SECRET, { expiresIn: 60 * 60 * 24 * 7 }, // 토큰 만료 기간 7일
        (err, token) => {
            if (err) {
                throw err;
            }
            res.cookie("user", token, {
                maxAge: 24 * 60 * 60 * 7,
            }).redirect("/users/regist"); // 'user' 명을 가진 쿠키
        });
    },
};
//# sourceMappingURL=jwt.js.map