const express = require("express");
require("dotenv").config();
const connectToDatabase = require("./db"); // Adjust the path as needed
const mainRouter = require("./routes/user.routes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/user", mainRouter);
connectToDatabase()
  .then(() => {
    app.listen(8000, () => {
      console.log(`App is listening on http://localhost:8000`);
    });
  })
  .catch((error) => {
    console.error(`Unable to start the server: ${error.message}`);
  });
