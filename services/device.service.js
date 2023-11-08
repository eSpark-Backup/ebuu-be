const Joi = require("joi");
const { DeviceModel } = require("../models/device.model");

class DeviceService {
  getSchemaForUpdate(data) {
    const schema = Joi.object({
      name: Joi.string(),
      age: Joi.number().greater(0),
      langauge: Joi.string(),
      kidsName: Joi.string(),
    });
    return schema.validate({ ...data });
  }
  async updateDevicePing(filter, data, options) {
    return DeviceModel.updateOne(
      filter,
      { ...data, ping: Date.now() },
      options
    );
  }
  findOne(filter, select) {
    return DeviceModel.findOne(filter, select);
  }
  connectWithUser(filter, user) {
    return DeviceModel.findOneAndUpdate(
      { ...filter, user: null },
      { user },
      { new: true }
    ).select("_id");
  }
  updateDevice(filter, data) {
    return DeviceModel.findOneAndUpdate(filter, data);
  }
}

module.exports = new DeviceService();
