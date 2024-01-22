const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
mongoose
  .connect(`${process.env.MONGODB_URI}/paytm`)
  .then((value) => {
    console.log(`DB connected`);
    app.listen(8000, () => {
      console.log(`App is listening on port https://localhost:8000`);
    });
  })
  .catch((error) => {
    console.error(`mongoose db connection failed: ${error.message}`);
  });
