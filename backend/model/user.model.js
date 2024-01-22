const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fullName: {
    type: String, // Corrected data type
    required: true,
  },
  lastName: {
    type: String, // Corrected data type
    required: true,
  },
  password: {
    type: String, // Corrected data type
    required: true,
    minLength: [8, "password should be a minimum of 8 characters"],
  },
  username: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
