const { manageError } = require("../../../helpers/error.helper");
const deviceService = require("../../../services/device.service");

class Controller {
  async addDevice(req, res) {
    try {
      const deviceInfo = await deviceService.addDevice(req.body);
      res.generateResponse(
        res,
        { _id: deviceInfo._id },
        200,
        "Device created successfully!"
      );
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async updateDevicePing(req, res) {
    try {
      await deviceService.updateDevicePing(req.body.macAddress);
      res.generateResponse(res, "", 200, "Ping updated successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async getDevicePing(req, res) {
    try {
      const device = await deviceService.getDevicePing(req.params.id);
      res.generateResponse(res, device, 200, "Device fetched successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async getDeviceByUser(req, res) {
    try {
      const filter = {
        _id: req.params.id,
        user: req.user._id,
      };
      const device = await deviceService.getSingleDevice(filter);
      res.generateResponse(res, device, 200, "Device fetched successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async getDevicesByUser(req, res) {
    try {
      const filter = {
        user: req.user._id,
      };
      const devices = await deviceService.getManyDevices(filter);
      res.generateResponse(res, devices, 200, "Devices fetched successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async connectWithUser(req, res) {
    try {
      const device = await deviceService.connectWithUser(
        {
          _id: req.body._id,
        },
        req.user._id
      );
      if (!device) {
        return res.generateResponse(res, "", 404, "Device not found!");
      }
      res.generateResponse(
        res,
        "",
        200,
        "Device connected with user successfully!"
      );
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async updateDeviceInfo(req, res) {
    try {
      const { error } = deviceService.getSchemaForUpdate(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to update device!",
          error.details
        );
      }
      const filter = {
        _id: req.params.id,
        user: req.user._id,
      };
      const device = await deviceService.updateDevice(filter, req.body);
      if (!device) {
        return res.generateResponse(res, "", 404, "Device not found!");
      }
      res.generateResponse(res, "", 200, "Device updated successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
}
module.exports = new Controller();
