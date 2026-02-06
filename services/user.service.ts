const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { generateErrorObject } = require("../helpers/error.helper");
const { UserModel } = require("../models/user.model");

class UserService {
  emailSchema = {
    email: Joi.string().required().email().message("Invalid email format"),
  };
  getUserSchema(data) {
    const schema = Joi.object({
      ...this.emailSchema,
      password: Joi.string().required(),
    });
    return schema.validate({ ...data });
  }
  getUserSchemaForAuth(data) {
    const schema = Joi.object({
      ...this.emailSchema,
    });
    return schema.validate({ ...data });
  }
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(5);
    const hashedPassowrd = bcrypt.hashSync(password, salt);
    return hashedPassowrd;
  }
  signJWT(_id) {
    return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  }
  comparePassword({ password, comparePassword }) {
    return bcrypt.compare(password, comparePassword);
  }
  getOne(filter) {
    return UserModel.findOne(filter);
  }
  createOne(data) {
    return UserModel.create(data);
  }
  async login(userData) {
    const errorMsg = "Invalid email or password!";
    const { email, password } = userData;
    const user = await this.getOne({ email, authEnabled: false });
    if (!user) {
      return Promise.reject(generateErrorObject(401, errorMsg));
    }
    const comparedPassword = await this.comparePassword({
      password,
      comparePassword: user.password,
    });
    if (comparedPassword) {
      return user;
    }
    return Promise.reject(generateErrorObject(401, errorMsg));
  }
  async loginWithAuth(userData) {
    let errorMsg = "Invalid email";
    const { email } = userData;
    const user = await this.getOne({ email, authEnabled: true });
    if (!user) {
      return Promise.reject(generateErrorObject(401, errorMsg));
    }
    return user;
  }
  async signup(userData) {
    const { email, password } = userData;
    return this.createOne({
      email,
      password: this.hashPassword(password),
    });
  }
  async signupWithAuth(userData) {
    const { email } = userData;
    return this.createOne({
      email,
      authEnabled: true,
    });
  }
}

module.exports = new UserService();
