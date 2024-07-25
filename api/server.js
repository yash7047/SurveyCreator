const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');

const dbName = "survey_manager";

var app = (module.exports = express());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://0.0.0.0:27017/" + dbName, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", function (e) {
  console.log(e);
  console.log("Could Not connect");
  process.exit(1);
});
mongoose.connection.on("open", function () {
  console.log("Successfully Connected");
});

app.use(cors());

app.use("/api/surveys", require("./routes/surveys"));
app.use("/api/users", require("./routes/users").users);
app.use("/account", require("./routes/account"));

app.get("/", function (req, res) {
  res.send("Server is working");
});

app.listen(8080, function () {
  console.log("Server started at port 8080");
});
