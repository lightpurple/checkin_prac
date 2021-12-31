"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const tracer_1 = require("tracer");
const cls_rtracer_1 = __importDefault(require("cls-rtracer"));
const format = "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})";
// const errorFormat = '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}' // error format
const dateFormat = "yyyy-mm-dd HH:MM:ss";
const loggerInfo = (0, tracer_1.dailyfile)({
    root: "./logs",
    format: format,
    dateformat: dateFormat,
    allLogsFileName: `info_${getTodayFormat()}`,
    logPathFormat: `{{root}}/{{prefix}}.log`,
});
exports.logger = {
    info(...trace) {
        return loggerInfo.info(cls_rtracer_1.default.id(), ...trace);
    },
};
function getTodayFormat() {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let format = year +
        "_" +
        ((month + "").length === 1 ? "0" : "") +
        month +
        "_" +
        ((date + "").length === 1 ? "0" : "") +
        date; // ex) 2021-12-25
    return format;
}
//# sourceMappingURL=logger.js.map