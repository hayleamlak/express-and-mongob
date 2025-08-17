const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  skills: [String],
  hobby: String, // optional field
});

module.exports = mongoose.model("User", userSchema);
