import React from "react";
import SurveysTable from "../components/SurveyConsole/SurveysTable";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

function SurveyConsole({ loginCred }) {

  return (
    <>
      <SidebarMenu loginCred={loginCred} />
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
