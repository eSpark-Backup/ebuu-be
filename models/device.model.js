const { Schema, model } = require("mongoose");
const { Types } = Schema;
const modelNames = require("./model.names");

const DeviceSchema = new Schema({
  name: {
    type: Types.String,
    required: true,
  },
  language: {
    type: Types.String,
    required: true,
  },
});

module.exports = {
  DeviceModel: model(modelNames.Device, DeviceSchema),
};
