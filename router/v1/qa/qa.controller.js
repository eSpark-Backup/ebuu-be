const { manageError } = require("../../../helpers/error.helper");
const qaService = require("../../../services/qa.service");

class Controller {
  async getQAs(req, res) {
    try {
      const filter = {
        user: req.user._id,
        device: req.params.id,
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
      const qa = await qaService.create(req.body, req.user._id, req.params.id);
      res.generateResponse(
        res,
        { _id: qa._id },
        200,
        "QA Created Successfully!"
      );
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
}
module.exports = new Controller();
