// import mongoose, { connection } from "mongoose";
const mongoose = require("mongoose");
// const connection = mongoose.connection;
mongoose.Promise = Promise;
const { l, logger } = require("./logger");
const db = mongoose.Connection;

let isConnected;

exports.connectDB = function connectDB() {
    return new Promise((resolve, reject) => {
        mongoose.connection.on("connected", function () {
            l.info("Mongoose successfully connected");
            isConnected = true;
            resolve(db);
        });

        mongoose.connection.on("error", function (err) {
            logger.error(err);
            l.error(`Mongoose default connection has occured error ${err}`);
        });

        mongoose.connection.on("disconnected", function () {
            l.warn("Mongoose connection disconnected");
        });

        // Close the Mongoose connection If the Node process ends
        process.on("SIGINT", () => {
            mongoose.connection.close(() => {
                console.log(
                    "Mongoose default connection is disconnected due to application termination"
                );
                process.exit(0);
            });
        });
        mongoose.set("strictQuery", true);
        try {
            mongoose.connect(process.env.MONGODB_URI);
        } catch (err) {
            logger.error(err);
            console.log("err-->>>>", err);
        }
    })
}