"use strict";
const sequelize_1 = require("sequelize");
module.exports = (sequelize) => {
    class User extends sequelize_1.Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.hasOne(models.Card, {
                foreignKey: "card_num",
            });
        }
    }
    User.init({
        card_num: sequelize_1.DataTypes.INTEGER,
        intra_id: sequelize_1.DataTypes.STRING,
        is_using: sequelize_1.DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};
//# sourceMappingURL=user.js.map