import React, { useState, useEffect } from "react";
import SurveysTable from "../components/SurveyConsole/SurveysTable";
import { getSurveys } from "../service/BackendService";

function SurveyConsole() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    getSurveys()
      .then((data) => {
        setSurveys(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <div className="SurveyConsole">
      <h2>Your Surveys</h2>
      <p>Manage all of your surveys and view their results.</p>
      <br/><br/>
      <SurveysTable surveys={surveys} />
    </div>
  );
}

export default SurveyConsole;
