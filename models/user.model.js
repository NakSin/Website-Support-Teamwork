const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  message: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);
