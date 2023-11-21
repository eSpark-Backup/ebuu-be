const { Schema, model } = require("mongoose");
const modelNames = require("./model.names");
const { Types } = Schema;

const QASchema = new Schema(
  {
    question: {
      type: Types.String,
      required: true,
    },
    answer: {
      type: Types.String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: modelNames.User,
    },
  },
  { timestamps: true }
);
module.exports = {
  QAModel: model(modelNames.QA, QASchema),
};
