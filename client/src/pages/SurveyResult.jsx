import { getResults } from "../service/BackendService";
import { useState, useEffect } from "react";
import ResultUI from "../components/SurveyResult/ResultUI";

function SurveyResult(props) {
  const [result, setResult] = useState(null);
  useEffect(() => {
    getResults(props.location.state.survey._id)
      .then((data) => {
        setResult(data);
      })
      .catch((e) => {
      });
  }, []);

  return (
    <div>
      <h1>Here are the results...</h1>
      <p>{ result ? <ResultUI survey={props.location.state} results={result} /> : "Loading"}</p>
    </div>
  );
}

export default SurveyResult;

//
