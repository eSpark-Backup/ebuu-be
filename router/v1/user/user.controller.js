const { manageError } = require("../../../helpers/error.helper");
const userService = require("../../../services/user.service");

class Controller {
  async login(req, res) {
    try {
      const { error } = userService.getUserSchema(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to login!",
          error.details
        );
      }
      const user = await userService.login(req.body);
      const token = userService.signJWT(user._id);
      res.generateResponse(
        res,
        { token, user: { email: user.email } },
        200,
        "User logged in successfully!"
      );
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async loginWithAuth(req, res) {
    try {
      const { error } = userService.getUserSchemaForAuthSignin(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to login!",
          error.details
        );
      }
      const user = await userService.loginWithAuth(req.body);
      const token = userService.signJWT(user._id);
      res.generateResponse(
        res,
        { token, user: { email: user.email } },
        200,
        "User logged in successfully!"
      );
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async signup(req, res) {
    try {
      const { error } = userService.getUserSchema(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to Signup!",
          error.details
        );
      }
      await userService.signup(req.body);
      res.generateResponse(res, "", 200, "User Registered successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
  async signupWithAuth(req, res) {
    try {
      const { error } = userService.getUserSchemaForAuthSignup(req.body);
      if (error) {
        return res.generateResponse(
          res,
          "",
          400,
          "Failed to Register!",
          error.details
        );
      }
      await userService.signupWithAuth(req.body);
      res.generateResponse(res, "", 200, "User Registered successfully!");
    } catch (error) {
      const err = manageError(error);
      res.generateResponse(res, "", err.code, err.message, err.errors);
    }
  }
}
module.exports = new Controller();
