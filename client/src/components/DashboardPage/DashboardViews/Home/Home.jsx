import SurveysList from "./HomeComponents/SurveysList";
import { getSurveys } from "../../../../service/BackendService";
import { useEffect, useState } from "react";

function Home() {
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
      <h1 className="HomePageHeading">Surveys you might like</h1>
      <SurveysList surveys={surveys} />
    </div>
  );
}

export default Home;
