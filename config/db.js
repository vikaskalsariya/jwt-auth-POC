const mongoose = require("mongoose");

const dbURI = process.env.DATABASE_URL;
mongoose
  .connect(dbURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Connection error", error));
