"use strict";
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class Card extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Card.belongsTo(models.User, {
                foreignKey: "card_num",
            });
        }
    }
    Card.init({
        card_num: sequelize_1.DataTypes.INTEGER,
        gaepo: sequelize_1.DataTypes.BOOLEAN,
        seocho: sequelize_1.DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "Card",
    });
    return Card;
};
//# sourceMappingURL=card.js.map