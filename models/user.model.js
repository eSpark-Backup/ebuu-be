const { Schema, model } = require("mongoose");
const modelNames = require("./model.names");
const { Types } = Schema;

const UserSchema = new Schema({
  email: {
    type: Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: Types.String,
  },
  authEnabled: {
    type: Types.Boolean,
    default: false,
    required: true,
  },
});

module.exports = {
  UserModel: model(modelNames.User, UserSchema),
};
