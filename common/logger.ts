const pino = require("pino");
require("winston-daily-rotate-file");
exports.l = pino({
    name: "BACKEND",
    level: "debug",
});

