import React, { useState } from "react";
import { v4 as generateId } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "../components/SurveyPage/Question";
import NavButton from "../components/SurveyPage/NavButton";
import { storeResponse } from "../service/BackendService";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

function Survey() {
  const location = useLocation();
  const navigate = useNavigate();
  const propsPassedFromLink = location.state;
  console.log(propsPassedFromLink);

  const questions = propsPassedFromLink.questions;
  const [selectedOptions, modifySelectedOptions] = useState(
    questions.map(() => [])
  );

  const QuestionList = questions.map((question, index) => {
    return (
      <Question
        key={index}
        source={question}
        questionIndex={index}
        markAnswer={markAnswer}
        selectedOptions={selectedOptions[index]}
      />
    );
  });

  function markAnswer(index, answers) {
    modifySelectedOptions((prevSelectedOptions) => {
      const newSelections = [...prevSelectedOptions];
      newSelections[index] = answers;
      return newSelections;
    });
  }

  function validateAnswers() {
    // Check if each question has been answered appropriately
    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      const answer = selectedOptions[i];

      if (question.type === "comment") {
        if (!answer[0] || answer[0].trim() === "") {
          return false; // Comment question not answered
        }
      } else {
        if (answer.length === 0) {
          return false; // No option selected for single or multiple-choice
        }
      }
    }
    return true; // All questions have been answered
  }

  function submitSurvey() {
    if (!validateAnswers()) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const response = {
      title: propsPassedFromLink.title,
      responseID: generateId(),
      answers: selectedOptions,
      surveyID: propsPassedFromLink.id,
    };

    storeResponse(response)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));

    navigate("/submission");
  }

  return (
    <>
      <SidebarMenu />
      <div style={{ marginLeft: "200px", marginTop: "20px" }}>
        <h3>{location.state.title}</h3>
        {QuestionList}
        <NavButton onClick={submitSurvey} title="Submit" />
      </div>
    </>
  );
}

export default Survey;
