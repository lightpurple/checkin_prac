"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const basename = path_1.default.basename(__filename);
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
exports.db = {};
const sequelize = new sequelize_1.Sequelize(config_1.default.database, config_1.default.username, config_1.default.password, {
    host: config_1.default.host,
    dialect: "mysql",
});
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf(".") !== 0 &&
        file !== basename &&
        file.slice(-3) === ".ts" &&
        file.lastIndexOf("index"));
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(sequelize);
    exports.db[model.name] = model;
});
Object.keys(exports.db).forEach((modelName) => {
    if (exports.db[modelName].associate) {
        exports.db[modelName].associate(exports.db);
    }
});
exports.db.sequelize = sequelize;
exports.db.Sequelize = sequelize_1.Sequelize;
//# sourceMappingURL=index.js.map