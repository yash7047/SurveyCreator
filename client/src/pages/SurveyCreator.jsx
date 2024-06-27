import React, { useState } from "react";
import { useHistory } from "react-router";
import QuestionCreator from "../components/SurveyCreator/QuestionCreator";
import { storeSurvey } from "../service/BackendService";
import { FaPlus } from "react-icons/fa";
import { v4 as generateId } from "uuid";

function SurveyCreator() {
  var history = useHistory();
  const [title, setTitle] = useState("");
  var [questionList, setQuestionListN] = useState([]);

  function addQuestionCreator() {
    setQuestionListN([
      ...questionList,
      {
        title: "",
        options: [],
      },
    ]);
  }

  function submitSurvey() {
    var createdSurvey = {
      _id: generateId(),
      title: title,
      questions: questionList,
    };
    storeSurvey(createdSurvey)
      .then((data) => {
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });

    history.push("/dashboard");
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
  }

  return (
    <div className="SurveyCreator">
      <h1>You are at Survey Creator page</h1>

      <div className="surveyTitle">
        <label htmlFor="surveyTitle" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="surveyTitle"
          onChange={handleTitleChange}
        ></input>
      </div>

      {questionList.map((question, index) => (
        <QuestionCreator key={index} question={question} />
      ))}
      <button
        className="btn btn-info addQuestionCreatorButton"
        onClick={addQuestionCreator}
      >
        <FaPlus />
        <span>Add</span>
      </button>
      <button
        className="submitButton btn btn-outline-success"
        onClick={submitSurvey}
      >
        Submit
      </button>
    </div>
  );
}

export default SurveyCreator;
