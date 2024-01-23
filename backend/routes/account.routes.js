const express = require("express");

const router = express.Router();

const authMiddleware = require("../midlleware/user.middleware");
const {
  balanceDetails,
  transferAmmount,
} = require("../controllers/account.controller");
router.route("/balance").get(authMiddleware, balanceDetails);
router.route("/transfer").put(authMiddleware, transferAmmount);
module.exports = router;
