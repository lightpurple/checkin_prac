import fs from "fs";
import path from "path";
const basename = path.basename(__filename);
import { Sequelize } from "sequelize";
import config from "../config/config";

export const db: any = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
    }
);

fs.readdirSync(__dirname)
    .filter((file: any) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".ts" &&
            file.lastIndexOf("index")
        );
    })
    .forEach((file: any) => {
        const model = require(path.join(__dirname, file))(sequelize);
        db[model.name] = model;
    });

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.User.hasOne(db.Card, {
    foreignKey: "card_num",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
