import React from "react";
import SurveysTable from "../components/SurveyConsole/SurveysTable";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

function SurveyConsole() {

  return (
    <>
      <SidebarMenu />
      <div className="SurveyConsole">
        <h2>Your Surveys</h2>
        <p>Manage all of your surveys and view their results.</p>
        <br/><br/>
        <SurveysTable />
      </div>
    </>
    
  );
}

export default SurveyConsole;
