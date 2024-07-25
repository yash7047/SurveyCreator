import SurveyTile from "./SurveyTile";

function SurveysList(props) {
  
  return (
    <div className="SurveysList row">
      {props.surveys.map((survey, index) => {
        return (
          <SurveyTile
            key={index}
            title={survey.title}
            questions={survey.questions}
            respondents={survey.responses.length}
            id={survey._id}
          />
        );
      })}
    </div>
  );
}

export default SurveysList;
