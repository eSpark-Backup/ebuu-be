const Joi = require("joi");
const { DeviceModel } = require("../models/device.model");
const {
  generateErrorObject,
  notFoundError,
} = require("../helpers/error.helper");

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
  addDevice(data) {
    const schema = Joi.object({
      name: Joi.string().required(),
      macAddress: Joi.string().required(),
      modelNumber: Joi.string().required(),
      firmwareVersion: Joi.string().required(),
      wifiSSID: Joi.string().required(),
    });
    const { error, value } = schema.validate(data);
    if (error) {
      throw generateErrorObject(400, "Failed to create device!", error.details);
    }
    return DeviceModel.create(value);
  }
  async updateDevicePing(macAddress) {
    try {
      if (!macAddress) {
        return Promise.reject(
          generateErrorObject(400, "Mac Address is required!")
        );
      }
      const device = await DeviceModel.findOneAndUpdate(
        { macAddress },
        {
          ping: Date.now(),
        }
      );
      if (!device) {
        return Promise.reject(notFoundError("Device not found!"));
      }
    } catch (error) {
      throw error;
    }
  }
  async getSingleDevice(filter, select = {}) {
    try {
      const device = await DeviceModel.findOne(filter, select);
      if (!device) {
        return Promise.reject(notFoundError("Device not found!"));
      }
      return device;
    } catch (error) {
      throw error;
    }
  }
  getManyDevices(filter, select = {}) {
    return DeviceModel.find(filter, select);
  }
  getDevicePing(_id) {
    return this.getSingleDevice({ _id }, { ping: 1 });
  }
  connectWithUser(filter, user) {
    return DeviceModel.findOneAndUpdate(
      // TODO: add timestamp (ping) validation as per requirement
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
