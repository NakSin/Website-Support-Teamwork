const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const boardSchema = new Schema({
  boardname: { type: String, required: true },
  ticket: { type: Number, required: false },
  created: { type: String, required: true },
  usersjoin: [
    {
      _id: { type: String, required: true },
      role: { type: String, require: true },
      datejoin: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Board", boardSchema);
