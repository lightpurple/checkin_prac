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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../models/index");
exports.default = {
    loginPage: (req, res, next) => {
        res.render("base.html");
    },
    registerPage: (req, res, next) => {
        res.render("card_input.html");
    },
    getUser: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("1");
        const users = yield index_1.db.User.findAll();
        res.json(users);
    }),
    registCard: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        yield index_1.db.User.update({ card_num: req.body.card_num }, { where: { intra_id: req.decoded.username } });
        res.send("<script>alert('체크인 성공!🤪');location.href='http://localhost:3000/users/show';</script>");
    }),
};
//# sourceMappingURL=UserController.js.map