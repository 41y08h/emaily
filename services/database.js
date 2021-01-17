const mongoose = require("mongoose");
const keys = require("../config/keys");

/** Initializes and configures database */
function initializeDatabase() {
  mongoose.connect(
    keys.mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => console.log("Database connected.")
  );
}

module.exports = initializeDatabase;
