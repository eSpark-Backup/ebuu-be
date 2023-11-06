const pino = require("pino");
var winston = require("winston");
require("winston-daily-rotate-file");

const appName = require("../package.json").name;
exports.l = pino({
    name: "BACKEND",
    level: "debug",
});

const transport = new winston.transports.DailyRotateFile({
    filename: `./logs/${appName}-%DATE%.log`,
    datePattern: "YYYY-MM-DD-HH",
    maxSize: "10m",
    maxFiles: "2d",
});

exports.logger = winston.createLogger({
    level: "error",
    transports: [transport],
});