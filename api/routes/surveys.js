const express = require("express");
const mongoose = require("mongoose");
const users = require("./users");

const surveys = express.Router();

const surveyQuestionSchema = new mongoose.Schema(
  {
    title: String,
    options: [String],
  },
  { _id: false }
);
const surveySchema = new mongoose.Schema({
  _id: { type: String },
  title: String,
  questions: [surveyQuestionSchema],
  responses: {
    type: [[Number]],
    default: [],
  },
});

const Survey = mongoose.model("Survey", surveySchema);

surveys.get("/", function (req, res) {
  //Get Surveys
  Survey.find(function (err, surveys) {
    if (err) {
      console.log(err);
    } else {
      res.json(surveys);
    }
  });
});

surveys.post("/", function (req, res) {
  //Post a new survey
  var data = req.body.survey;

  const survey = new Survey(data);
  survey.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      users.addSurveyID(data.id);
      console.log("Survey saved successfully");
    }
  });
});

surveys.post("/postResponse", function (req, res) {
  var data = req.body;

  Survey.updateOne(
    { _id: data.surveyID },
    { $push: { responses: data.answers } },
    function (err, success) {
      console.log(success);
    }
  );

  res.json("Response stored successfully");
});

surveys.get("/getSurvey", function (req, res) {
  console.log(req.query.id);
  Survey.findById(req.query.id, function (err, survey) {
    if (err) {
      console.log(err);
    } else {
      res.json(survey);
    }
  });
});

surveys.get("/generateResults", function(req, res) {
  console.log(req.query.id + " - ID");
  Survey.findById(req.query.id, function (err, foundSurvey) {
    if (err) {
      console.log(err);
    } else {
      console.log("here");
      res.json(generateResult(foundSurvey));
    }
  });
})

function generateResult(survey) {
  var results = [];
  survey.questions.forEach((question, index) => {
    var result = new Array(question.options.length).fill(0);

    survey.responses.forEach((response) => {
      result[response[index]] += 1;
    });
    results.push(result);
  });
  console.log(results)
  return results;
}

module.exports = surveys;
