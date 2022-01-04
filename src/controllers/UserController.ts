import { NextFunction, Request, Response } from "express";
import { now } from "sequelize/types/lib/utils";
import { db } from "../models/index";

export default {
    loginPage: async (req: any, res: Response, next: NextFunction) => {
        var query_gaepo =
            "select count(*) from Users inner join Cards on Users.card_num = Cards.card_num where gaepo=true";
        var query_seocho =
            "select count(*) from Users inner join Cards on Users.card_num = Cards.card_num where seocho=true";
        const gaepo_count = JSON.stringify(
            await db.User.sequelize.query(query_gaepo)
        );
        const seocho_count = JSON.stringify(
            await db.User.sequelize.query(query_seocho)
        );
        res.render("base.html", {
            gaepo_count: gaepo_count.substr(gaepo_count.indexOf(":") + 1, 1),
            seocho_count: seocho_count.substr(seocho_count.indexOf(":") + 1, 1),
        });
    },
    registerPage: (req: Request, res: Response, next: NextFunction) => {
        res.render("card_input.html");
    },
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        const users = await db.User.findAll();
        res.json(users);
    },
    registCard: async (req: any, res: Response, next: NextFunction) => {
        if (req.body.card_num < 1 || isNaN(req.body.card_num)) {
            // 카드번호가 1보다 작을 때
            res.send(
                "<script>alert('잘못된 카드번호입니다.');location.href='http://localhost:3000/users/regist';</script>"
            );
        }
        const exist_card = await db.User.findOne({
            where: { card_num: req.body.card_num },
        });
        if (exist_card) {
            // 카드가 이미 존재할 경우
            res.send(
                "<script>alert('이미 사용중인 카드입니다.');location.href='http://localhost:3000/users/regist';</script>"
            );
        }
        await db.User.update(
            // User모델 card_num 업데이트
            { card_num: req.body.card_num, is_using: true },
            { where: { intra_id: req.decoded.username } }
        );
        if (req.body.card_num < 1000) {
            // 카드번호가 1000 이하면 개포
            await db.Card.create({
                card_num: req.body.card_num,
                gaepo: true,
            });
        } else {
            // 카드번호가 1000이상이면 서초
            await db.Card.create({
                card_num: req.body.card_num,
                seocho: true,
            });
        }
        res.send(
            "<script>alert('체크인 성공!🤪');location.href='http://localhost:3000/users';</script>"
        );
    },
    logOut: async (req: any, res: Response, next: NextFunction) => {
        const user = await db.User.findOne({
            where: { intra_id: req.decoded.username },
        });
        console.log(user.dataValues.card_num);
        await db.Card.destroy({
            where: { card_num: user.dataValues.card_num },
        });
        await db.User.update(
            { card_num: "0", is_using: false },
            { where: { intra_id: req.decoded.username } }
        );
        res.clearCookie("user").redirect("/users/");
    },
};
