import React, { useState } from "react";
import QuestionCreator from "../components/SurveyCreator/QuestionCreator";
import { storeSurvey } from "../service/BackendService";
import { FaPlus } from "react-icons/fa";
import { v4 as generateId } from "uuid";
import { useNavigate } from "react-router-dom";

function SurveyCreator() {
  var history = useNavigate();
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
    if(questionList.length == 0) {
      return;
    }
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
      history("/dashboard");
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
      <button className="btn btn-info addQuestionCreatorButton" onClick={addQuestionCreator}>
        <FaPlus /><span>Add</span>
      </button>
      <button className="submitButton btn btn-outline-success" onClick={submitSurvey}>
        Submit
      </button>
    </div>
  );
}

export default SurveyCreator;
