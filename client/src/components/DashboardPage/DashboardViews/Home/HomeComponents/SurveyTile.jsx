import { Link } from "react-router-dom";

function SurveyTile(props) {
  return (
    <div className="SurveyTile card col-lg-6">
      <div className="card-body">
        <h3 className="card-title">{props.title}</h3>
        <Link
          to={{
            pathname: "/survey",
            state: {
              title: props.title,
              questions: props.questions,
              id: props.id,
            },
          }}
        >
          <button className="OpenSurveyButton btn">Take Survey</button>
        </Link>
      </div>
    </div>
  );
}

export default SurveyTile;
