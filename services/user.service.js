const Joi = require("joi");
const { generateErrorObject } = require("../helpers/error.helper");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");

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
      secretKey: Joi.string().required(),
    });
    return schema.validate({ ...data });
  }
  hashPassword(password) {
    const salt = bcrypt.genSaltSync(5);
    const hashedPassowrd = bcrypt.hashSync(password, salt);
    return hashedPassowrd;
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
  updateOne(filter, data) {
    return UserModel.updateOne(filter, data);
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
    const { email, secretKey } = userData;
    const user = await this.getOne({ email, authEnabled: true });
    if (!user) {
      return Promise.reject(generateErrorObject(401, errorMsg));
    }
    const comparedSecret = await this.comparePassword({
      password: process.env.AUTH_SECRET,
      comparePassword: secretKey,
    });
    if (comparedSecret) {
      return user;
    }
    errorMsg = "Invalid Secret key!";
    return Promise.reject(generateErrorObject(401, errorMsg));
  }
  async signup(userData) {
    const { email, password } = userData;
    return this.createOne({
      email,
      password: this.hashPassword(password),
    });
  }
  async signupWithAuth(userData) {
    const { email, secretKey } = userData;
    const comparedSecret = await this.comparePassword({
      password: process.env.AUTH_SECRET,
      comparePassword: secretKey,
    });
    if (!comparedSecret) {
      return Promise.reject(generateErrorObject(401, "Invalid Secret key!"));
    }
    return this.createOne({
      email,
      authEnabled: true,
    });
  }
}

module.exports = new UserService();
