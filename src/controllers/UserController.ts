import { NextFunction, Request, Response } from "express";
import { db } from "../models/index";

export default {
    loginPage: async (req: Request, res: Response, next: NextFunction) => {
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
        await db.User.update(
            { card_num: req.body.card_num, is_using: true },
            { where: { intra_id: req.decoded.username } }
        );
        console.log("1");
        if (req.body.card_num < 1000) {
            // 카드번호가 1000 이하면 개포
            console.log("1");

            await db.Card.create({
                // 여기서 에러발생!
                card_num: req.body.card_num,
                gaepo: true,
                seocho: false,
            });
            console.log("1");
        } else {
            console.log("2");

            // 카드번호가 1000이상이면 서초
            await db.Card.create({
                card_num: req.body.card_num,
                gaepo: false,
                seocho: true,
            });
            console.log("2");
        }
        res.send(
            "<script>alert('체크인 성공!🤪');location.href='http://localhost:3000/users/show';</script>"
        );
    },
    logOut: async (req: any, res: Response, next: NextFunction) => {
        const user = await db.Users.findOne({
            where: { intra_id: req.decoded.username },
        });
        await db.Card.destroy({ where: { card_num: user[0][0].card_num } });
        await db.User.update(
            { card_num: "0", is_using: false },
            { where: { intra_id: req.decoded.username } }
        );
        res.clearCookie("user").redirect("/users/");
    },
};
