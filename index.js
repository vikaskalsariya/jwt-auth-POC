const express = require("express");
require("dotenv").config();
const db = require("./config/db");
// const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use("/", require("./router/user"));

app.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log(`server is running at ${PORT} port`);
});
