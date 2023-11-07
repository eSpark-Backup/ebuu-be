const { DeviceModel } = require("../models/device.model");

class DeviceService {
  async createNewDevice(filter, data, options) {
    return DeviceModel.updateOne(filter, data, options);
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
}

module.exports = new DeviceService();
