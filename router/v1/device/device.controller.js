const Joi = require("joi");
const { manageError } = require("../../../helpers/error.helper");
const deviceService = require("../../../services/device.service");
const userService = require("../../../services/user.service");

class Controller {
  async create(req, res) {
    try {
      const schema = Joi.object({
        name: Joi.string().required(),
        language: Joi.string().required(),
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
      const device = await deviceService.createOne(req.body);
      await userService.updateOne(
        { _id: req.user._id },
        { $push: { devices: device._id } }
      );
      res.generateResponse(res, "", 200, "Device created successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
}
module.exports = new Controller();
