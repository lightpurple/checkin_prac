"use strict";
import { Model, DataTypes } from "sequelize";

export = (sequelize: any) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            User.hasOne(models.Card, {
                foreignKey: "card_num",
            });
        }
    }
    User.init(
        {
            card_num: DataTypes.INTEGER,
            intra_id: DataTypes.STRING,
            is_using: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "User",
        }
    );
    return User;
};
