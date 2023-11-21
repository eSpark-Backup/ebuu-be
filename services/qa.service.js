const Joi = require("joi");
const { QAModel } = require("../models/qa.model");

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
  create(data) {
    return QAModel.create(data);
  }
}

module.exports = new QAService();
