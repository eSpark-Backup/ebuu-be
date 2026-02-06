var jwt = require("jsonwebtoken");
const userService = require("../services/user.service");
const { manageError } = require("../helpers/error.helper");
const secret = process.env.JWT_SECRET;

const authenticateUser = async (req, res, next) => {
  try {
    let token = req.header("authorization");
    let errorMsg = "";
    if (!token) {
      errorMsg = "Missing token!";
      return res.generateResponse(res, "", 401, errorMsg);
    }
    const bearer = token.split("Bearer ");
    if (bearer.length !== 2) {
      errorMsg = "Invalid token!";
      return res.generateResponse(res, "", 401, errorMsg);
    }
    token = bearer[1];
    const data = jwt.verify(token, secret);
    const user = await userService.getOne({ _id: data._id });
    if (!user) {
      errorMsg = "User Not Found!";
      return res.generateResponse(res, "", 401, errorMsg);
    }
    req.user = user;
    next();
  } catch (error) {
    const err = manageError(error);
    res.generateResponse(res, "", 401, err.message, err.errors);
  }
};
module.exports = authenticateUser;
