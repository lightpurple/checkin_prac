"use strict";
import { Model, DataTypes } from "sequelize";

export = (sequelize: any) => {
    class Card extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models: any) {
            Card.belongsTo(models.User, {
                foreignKey: "card_num",
            });
        }
    }
    Card.init(
        {
            card_num: DataTypes.INTEGER,
            gaepo: DataTypes.BOOLEAN,
            seocho: DataTypes.BOOLEAN,
        },
        {
            sequelize,
            modelName: "Card",
        }
    );
    return Card;
};
