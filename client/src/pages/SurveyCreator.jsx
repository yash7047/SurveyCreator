import React, { useState } from "react";
import QuestionCreator from "../components/SurveyCreator/QuestionCreator";
import { storeSurvey } from "../service/BackendService";
import { FaPlus } from "react-icons/fa";
import { v4 as generateId } from "uuid";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

function SurveyCreator() {
  const navigate = useNavigate(); // Updated from var to const
  const [title, setTitle] = useState("");
  const [questionList, setQuestionList] = useState([]); // Updated from var to const

  const addQuestionCreator = () => {
    setQuestionList([
      ...questionList,
      {
        title: "",
        options: [],
        type: "single",
      },
    ]);
  };

  const submitSurvey = () => {
    if (questionList.length === 0 || title.length === 0) {
      console.log("Title or questions are missing.");
      return;
    }
    const createdSurvey = {
      _id: generateId(),
      title: title,
      questions: questionList,
    };
    storeSurvey(createdSurvey)
      .then((data) => {
        console.log("Survey saved successfully:", data);
        navigate("/dashboard");
      })
      .catch((e) => {
        console.error("Error storing survey:", e);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <>
    <SidebarMenu />
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
          value={title} // Added value to synchronize state
        />
      </div>

      {questionList.map((question, index) => (
        <QuestionCreator
          key={index}
          index={index}
          question={question}
          setQuestionList={setQuestionList}
        />
      ))}
      <button
        className="btn btn-info addQuestionCreatorButton"
        onClick={addQuestionCreator}
      >
        <FaPlus />
        <span>Add</span>
      </button>
      <button className="submitButton btn btn-outline-success" onClick={submitSurvey}>
        Submit
      </button>
    </div>
    </>
  );
}

export default SurveyCreator;
