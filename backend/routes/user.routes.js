const express = require("express");
const {
  signUp,
  updateUser,
  filterLogic,
  signIn,
} = require("../controllers/user.controller");
const app = express();
const router = express.Router();
const authMiddleware = require("../midlleware/user.middleware");
router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/update").put(authMiddleware, updateUser);
router.route("/bulk").get(filterLogic);
module.exports = router;
