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
  providerID: {
    type: Types.String,
    unique: true,
    sparse: true,
  },
  authType: {
    type: Types.String,
    enum: ["FACEBOOK", "GOOGLE", "APPLE", null],
    default: null,
  },
});
module.exports = {
  UserModel: model(modelNames.User, UserSchema),
};
