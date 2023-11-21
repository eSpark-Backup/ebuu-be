const Joi = require("joi");
const { manageError } = require("../../../helpers/error.helper");
const deviceService = require("../../../services/device.service");

class Controller {
  async updateDevicePing(req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        macAddress: Joi.string().required(),
        modelNumber: Joi.string().required(),
        firmwareVersion: Joi.string().required(),
        wifiSSID: Joi.string().required(),
      });
      const { error } = schema.validate(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to create device!",
          error.details
        );
      }
      const filter = { macAddress: req.body.macAddress, user: null };
      await deviceService.updateDevicePing(filter, req.body, {
        upsert: true,
        new: true,
      });
      res.generateResponse(res, "", 200, "Ping updated successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async getDevicePing(req, res) {
    try {
      const filter = {
        macAddress: req.params.macAddress,
        user: null,
      };
      const device = await deviceService.findOne(filter, { ping: 1 });
      if (!device) {
        return res.generateResponse(res, "", 404, "Device not found!");
      }
      res.generateResponse(res, device, 200, "Device fetched successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async getDeviceByID(req, res) {
    try {
      const filter = {
        _id: req.params.id,
        user: req.user._id,
      };
      const device = await deviceService.findOne(filter);
      if (!device) {
        return res.generateResponse(res, "", 404, "Device not found!");
      }
      res.generateResponse(res, device, 200, "Device fetched successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async connectWithUser(req, res) {
    try {
      const device = await deviceService.connectWithUser(
        {
          macAddress: req.body.macAddress,
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
