import React, { useState, useEffect } from "react";
import SurveysTable from "../components/SurveyConsole/SurveysTable";
import { getSurveys } from "../service/BackendService";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

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
    <>
      <SidebarMenu />
      <div className="SurveyConsole">
        <h2>Your Surveys</h2>
        <p>Manage all of your surveys and view their results.</p>
        <br/><br/>
        <SurveysTable surveys={surveys} />
      </div>
    </>
    
  );
}

export default SurveyConsole;
