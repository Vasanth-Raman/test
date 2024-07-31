const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const responseSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: "Form", required: true },
  firstInteractionTime: { type: String, required: true },
  responses: [
    {
      _id: false,
      title: { type: String, required: true },
      response: { type: String, required: true },
    },
  ],
});

const Response = mongoose.model("Response", responseSchema);

module.exports = Response;
