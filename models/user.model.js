const { Schema, model } = require("mongoose");
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

const ModelName = "User";

module.exports = {
  UserModel: model(ModelName, UserSchema),
};
