const Joi = require("joi");
const { QAModel } = require("../models/qa.model");
const deviceService = require("./device.service");
const {
  notFoundError,
  generateErrorObject,
} = require("../helpers/error.helper");

class QAService {
  addQASchema(data) {
    const schema = Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    });
    return schema.validate({ ...data });
  }
  getAll(filter) {
    return QAModel.find(filter);
  }
  async create(body, user, deviceID) {
    const { error, value } = this.addQASchema(body);
    if (error) {
      return Promise.reject(generateErrorObject(400, "Failed to create QA"));
    }
    const filter = {
      user,
      _id: deviceID,
    };
    const select = {
      _id: 1,
    };
    const device = await deviceService.getSingleDevice(filter, select);
    if (!device) {
      return Promise.reject(notFoundError("Device not found!"));
    }
    return QAModel.create({ ...value, device: device._id, user });
  }
}

module.exports = new QAService();
