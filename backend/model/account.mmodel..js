const mongoose = require("mongoose");
const { string } = require("zod");

const accountSchema = mongoose.Schema({
  userId: {
    type: String,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);
