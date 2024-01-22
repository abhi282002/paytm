const mongoose = require("mongoose");

const connectToDatabase = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/paytm`);
    console.log(`DB connected`);
  } catch (error) {
    console.error(`mongoose db connection failed: ${error.message}`);
  }
};

module.exports = connectToDatabase;
