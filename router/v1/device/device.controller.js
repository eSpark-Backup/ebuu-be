const Joi = require("joi");
const { manageError } = require("../../../helpers/error.helper");
const deviceService = require("../../../services/device.service");
const userService = require("../../../services/user.service");

class Controller {
  async create(req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        macAddress: Joi.string().required(),
        modelNumber: Joi.string().required(),
        firmwareVersion: Joi.string().required(),
        wifiSSID: Joi.string().required(),
        secretKey: Joi.string().required(),
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
      const comparedSecret = await userService.comparePassword({
        password: process.env.DEVICE_AUTH_SECRET,
        comparePassword: req.body.secretKey,
      });
      if (!comparedSecret) {
        return res.generateResponse(res, "", 401, "Invalid Secret key!");
      }
      await deviceService.createNewDevice(
        { macAddress: req.body.macAddress },
        req.body,
        {
          upsert: true,
          new: true,
        }
      );
      res.generateResponse(res, "", 200, "Device created successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async getDevice(req, res) {
    try {
      const device = await deviceService.findOne(
        {
          macAddress: req.params.macAddress,
        },
        { updatedAt: 1 }
      );
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
}
module.exports = new Controller();
