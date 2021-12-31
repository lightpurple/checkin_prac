"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Cards", {
            card_num: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                allowNull: false,
                unique: true,
            },
            gaepo: {
                type: Sequelize.BOOLEAN,
            },
            seocho: {
                type: Sequelize.BOOLEAN,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Cards");
    },
};
