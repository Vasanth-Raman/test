const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const folderSchema = new Schema({
  folderName: {
    type: String,
    required: true,
  },
  forms: [
    {
      type: Schema.Types.ObjectId,
      ref: "Form",
    },
  ],
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Folder = mongoose.model("Folder", folderSchema);

module.exports = Folder;
