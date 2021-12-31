import { dailyfile } from "tracer";
import rTracer from "cls-rtracer";

const format = "{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})";
// const errorFormat = '{{timestamp}} <{{title}}> {{message}} (in {{file}}:{{line}})\nCall Stack:\n{{stack}}' // error format
const dateFormat = "yyyy-mm-dd HH:MM:ss";

const loggerInfo = dailyfile({
    root: "./logs",
    format: format,
    dateformat: dateFormat,
    allLogsFileName: `info_${getTodayFormat()}`,
    logPathFormat: `{{root}}/{{prefix}}.log`,
});

export const logger = {
    info(...trace: any[]) {
        return loggerInfo.info(rTracer.id(), ...trace);
    },
};

function getTodayFormat() {
    let today = new Date();

    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜

    let format =
        year +
        "_" +
        ((month + "").length === 1 ? "0" : "") +
        month +
        "_" +
        ((date + "").length === 1 ? "0" : "") +
        date; // ex) 2021-12-25
    return format;
}
