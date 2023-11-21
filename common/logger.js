const pino = require("pino");
exports.l = pino({
    name: "BACKEND",
    level: "debug",
});

