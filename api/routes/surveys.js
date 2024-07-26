const express = require("express");
const mongoose = require("mongoose");
const users = require("./users");

const surveys = express.Router();

const surveyQuestionSchema = new mongoose.Schema(
  {
    title: String,
    options: [String],
    type: String
  },
  { _id: false }
);
const surveySchema = new mongoose.Schema({
  _id: { type: String },
  title: String,
  questions: [surveyQuestionSchema],
  responses: {
    type: mongoose.Schema.Types.Mixed, // Use an appropriate type for responses
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
  console.log(data);
  survey.save(function (err) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to save survey." }); // Send an error response
    } else {
      users.addSurveyID(data._id);
      console.log("Survey saved successfully");
      res.status(200).json({ message: "Survey saved successfully" }); // Send a success response
    }
  });
});

surveys.post("/postResponse", function (req, res) {
  var data = req.body;

  if (!data.surveyID || !data.answers) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  Survey.updateOne(
    { _id: data.surveyID },
    { $push: { responses: data.answers } },
    function (err, result) {
      if (err) {
        console.error("Error updating survey:", err);
        return res.status(500).json({ error: "Failed to store response" });
      }

      if (result.nModified === 0) {
        console.warn("No documents were updated. Check surveyID:", data.surveyID);
        return res.status(404).json({ error: "Survey not found" });
      }

      console.log("Survey updated successfully:", result);
      res.json({ message: "Response stored successfully" });
    }
  );
});

surveys.get("/getSurvey", function (req, res) {
  Survey.findById(req.query.id, function (err, survey) {
    if (err) {
      console.log(err);
    } else {
      res.json(survey);
    }
  });
});

surveys.delete("/:id", function (req, res) {
  // Delete a survey
  const surveyId = req.params.id;

  Survey.findByIdAndDelete(surveyId, function (err, deletedSurvey) {
    if (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to delete survey" });
    } else if (!deletedSurvey) {
      res.status(404).json({ error: "Survey not found" });
    } else {
      res.json({ message: "Survey deleted successfully" });
    }
  });
});

surveys.get("/generateResults", function(req, res) {
  console.log(req.query.id + " - ID");
  Survey.findById(req.query.id, function (err, foundSurvey) {
    if (err) {
      console.log(err);
    } else {
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
