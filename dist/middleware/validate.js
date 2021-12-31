"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("../models");
const jwt_1 = __importDefault(require("./jwt"));
exports.default = {
    isLoggedin: (req, res, next) => {
        jwt_1.default.isTokenExist(req, res, next);
        next();
    },
    isUserExist: (token, rt, profile) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            if (profile._json.cursus_users.length < 2) {
                return false;
            }
            else {
                const [user, create] = yield models_1.db.User.findOrCreate({
                    where: { intra_id: profile.username },
                });
                return user;
            }
        }
        catch (e) {
            return false;
        }
    }),
};
//# sourceMappingURL=validate.js.map