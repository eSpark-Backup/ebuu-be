const userService = require("../services/user.service");
const { manageError } = require("../helpers/error.helper");

const sercretChecker = (password) => async (req, res, next) => {
  try {
    const secretKey = req.header("secret-key");
    let errorMsg = "";
    if (!secretKey) {
      errorMsg = "Missing Secret Key!";
      return res.generateResponse(res, "", 401, errorMsg);
    }
    const comparedSecret = await userService.comparePassword({
      password,
      comparePassword: secretKey,
    });
    if (!comparedSecret) {
      errorMsg = "Invalid Secret Key";
      return res.generateResponse(res, "", 401, errorMsg);
    }
    next();
  } catch (error) {
    const err = manageError(error);
    res.generateResponse(res, "", 401, err.message, err.errors);
  }
};
module.exports = sercretChecker;
