import { getResults } from "../service/BackendService";
import { useState, useEffect } from "react";
import ResultUI from "../components/SurveyResult/ResultUI";
import { useLocation } from "react-router-dom";

function SurveyResult(props) {
  const [result, setResult] = useState(null);
  const location = useLocation()
  useEffect(() => {
    getResults(location.state.survey._id)
      .then((data) => {
        setResult(data);
      })
      .catch((e) => {
      });
  }, []);

  return (
    <div>
      <h1>Here are the results...</h1>
      <p>{ result ? <ResultUI survey={location.state} results={result} /> : "Loading"}</p>
    </div>
  );
}

export default SurveyResult;

//
