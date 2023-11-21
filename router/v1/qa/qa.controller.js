const Joi = require("joi");
const { manageError } = require("../../../helpers/error.helper");
const qaService = require("../../../services/qa.service");

class Controller {
  async getQAs(req, res) {
    try {
      const filter = {
        user: req.user._id,
      };
      const qas = await qaService.getAll(filter);
      res.generateResponse(res, qas, 200, "QAs fetched Successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async addQA(req, res) {
    try {
      const { error } = qaService.addQASchema(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to create QA!",
          error.details
        );
      }
      const { question, answer } = req.body;
      const data = {
        user: req.user._id,
        question,
        answer,
      };
      const qa = await qaService.create(data);
      res.generateResponse(res, qa, 200, "QA Created Successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
}
module.exports = new Controller();
