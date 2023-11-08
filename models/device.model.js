const { Schema, model } = require("mongoose");
const { Types } = Schema;
const modelNames = require("./model.names");

const DeviceSchema = new Schema({
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
  langauge: {
    type: Types.String,
    default: null,
  },
  battery: {
    type: Types.String,
    default: null,
  },
  age: {
    type: Types.Number,
    default: null,
  },
  kidsName: {
    type: Types.String,
    default: null,
  },
  ping: {
    type: Types.Date,
    default: Date.now(),
  },
});

module.exports = {
  DeviceModel: model(modelNames.Device, DeviceSchema),
};
