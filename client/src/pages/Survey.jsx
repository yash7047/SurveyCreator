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

  function submitSurvey() {
    const response = {
      title: propsPassedFromLink.title,
      responseID: generateId(),
      answers: selectedOptions,
      surveyID: propsPassedFromLink.id,
    };
  
    storeResponse(response)
      .then((data) => console.log("Response stored:", data))
      .catch((e) => console.error("Error storing response:", e));
  
    navigate("/submission");
  }

  function markAnswer(index, answers) {
    modifySelectedOptions((prevSelectedOptions) => {
      const newSelections = [...prevSelectedOptions];
      newSelections[index] = answers;
      return newSelections;
    });
  }

  return (
    <>
      <SidebarMenu />
      <div style={{ marginLeft: "200px", marginTop: "20px" }}>
        <h2>{location.state.title}</h2>
        {QuestionList}
        <NavButton onClick={submitSurvey} title="Submit" />
      </div>
    </>
  );
}

export default Survey;
