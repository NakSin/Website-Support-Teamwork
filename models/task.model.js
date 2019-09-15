const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const taskSchema = new Schema({
  taskname: { type: String, required: true },
  numberticket: { type: Number, required: true },
  created: { type: String, required: true },
  detail: { type: String, required: false },
  listId: { type: String, required: true },
  ticketId: [{ _id: { type: String, required: false } }],
  loading: { type: Number, required: true }
});

module.exports = mongoose.model("Task", taskSchema);
