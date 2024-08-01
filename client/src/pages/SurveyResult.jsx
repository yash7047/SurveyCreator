import { getResults } from "../service/BackendService";
import { useState, useEffect } from "react";
import ResultUI from "../components/SurveyResult/ResultUI";
import { useLocation } from "react-router-dom";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

function SurveyResult(props) {
  const [result, setResult] = useState(null);
  const location = useLocation();

  useEffect(() => {
    getResults(location.state.survey._id)
      .then((data) => {
        setResult(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [location.state.survey._id]);

  return (
    <>
      <SidebarMenu loginCred={props.loginCred} />
      <div style={{ marginLeft: "200px", marginTop: "20px" }}>
        <div>
          {result ? (
            <ResultUI survey={location.state} results={result} />
          ) : (
            "Loading..."
          )}
        </div>
      </div>
    </>
  );
}

export default SurveyResult;
