import { Link } from "react-router-dom";

function SurveyTile(props) {
  return (
    <div className="SurveyTile card col-lg-6">
      <div className="card-body">
        <h4 className="card-title">{props.title}</h4>
        <em><strong>{props.respondents}</strong> people have responded on this survey.</em>
        <Link to="/survey"
          state={{
            title: props.title,
            questions: props.questions,
            id: props.id,
          }}>
          <button className="OpenSurveyButton btn">Take Survey</button>
        </Link>
      </div>
    </div>
  );
}

export default SurveyTile;
