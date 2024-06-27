const express = require("express");
const mongoose = require("mongoose");

const users = express.Router();

const userSchema = new mongoose.Schema({
  survey: String,
});

const User = mongoose.model("User", userSchema);

users.get("/", function (req, res) {
  User.find({}, function (err, surveyIds) {
    if (err) {
      console.log(err);
    } else {
      console.log(surveyIds);
      res.json(surveyIds);
    }
  });
});

function addSurveyID(surveyID) {
  const user = new User({
    survey: surveyID,
  });

  user.save(function (err) {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = {
   users: users,
   addSurveyID: addSurveyID };

