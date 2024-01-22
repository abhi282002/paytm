const express = require("express");
const signUp = require("../controllers/user.controller");
const app = express();
const router = express.Router();

router.route("/signup").post(signUp);

module.exports = router;
