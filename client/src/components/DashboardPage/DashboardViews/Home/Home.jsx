import SurveysList from "./HomeComponents/SurveysList";
import { getSurveys } from "../../../../service/BackendService";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home({ loginCred }) {
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
    <div className="Home">
      <div>
        <h1 className="HomePageHeading">Surveys you might like</h1>
        {loginCred.username == "Ashok" && <Link to="/create-survey">
          <button className="btn btn-large addSurveybtn">Add Survey</button>
        </Link>}
      </div>
      <SurveysList surveys={surveys} />
    </div>
  );
}

export default Home;
