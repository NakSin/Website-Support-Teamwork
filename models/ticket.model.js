const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ticketSchema = new Schema({
  ticketname: { type: String, required: true },
  checkdone: { type: Boolean, required: true },
  created: { type: String, required: true },
  taskId: { type: String, required: true }
});

module.exports = mongoose.model("Ticket", ticketSchema);
