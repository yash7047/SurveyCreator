import React, { useState } from "react";
import { v4 as generateId } from "uuid";
import { useLocation, useNavigate } from "react-router-dom";
import Question from "../components/SurveyPage/Question";
import NavButton from "../components/SurveyPage/NavButton";
import { storeResponse } from "../service/BackendService";

function Survey() {
  var history = useLocation(); //holds the routing history and has funtions to redirect to other routes
  var navigate = useNavigate();
  const propsPassedFromLink = history.state 
  console.log(propsPassedFromLink)
  var [questionIndex, setQuestionIndex] = useState(0);
  var questions = propsPassedFromLink.questions;
  const [selectedOptions, modifySelectedOptions] = useState(
    new Array(questions.length).fill(null)
  );

  const QuestionList = questions.map((question, questionIndex) => {
    return (
    <Question
        source={question}
        questionIndex={questionIndex}
        markAnswer={markAnswer}
      />
    )
  })

  function submitSurvey() {
    var response = {
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

  function markAnswer(selectedOptionID) {
    modifySelectedOptions(function () {
      selectedOptions[questionIndex] = selectedOptionID;
      return selectedOptions;
    });
  }

  return (
    <div style={{marginLeft: '200px',marginTop: '20px'}}>
      <h2>{history.state.title}</h2>
      {QuestionList}
      <NavButton onClick={submitSurvey} title="Submit" />
    </div>
  );
}

export default Survey;
