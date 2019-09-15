const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const listSchema = new Schema({
  listname: { type: String, required: true },
  numbertask: { type: Number, required: true },
  created: { type: String, required: true },
  boardId: { type: String, required: true },
  taskId: [{ _id: { type: String, required: false } }],
});

module.exports = mongoose.model("List", listSchema);
