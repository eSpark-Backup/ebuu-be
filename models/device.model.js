const { Schema, model } = require("mongoose");
const { Types } = Schema;
const modelNames = require("./model.names");

const DeviceSchema = new Schema(
  {
    name: {
      type: Types.String,
      required: true,
    },
    macAddress: {
      type: Types.String,
      unique: true,
      required: true,
    },
    modelNumber: {
      type: Types.String,
      required: true,
    },
    firmwareVersion: {
      type: Types.String,
      required: true,
    },
    wifiSSID: {
      type: Types.String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: modelNames.User,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  DeviceModel: model(modelNames.Device, DeviceSchema),
};
