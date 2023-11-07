const { DeviceModel } = require("../models/device.model");

class DeviceService {
  createOne(data) {
    return DeviceModel.create(data);
  }
}

module.exports = new DeviceService();
