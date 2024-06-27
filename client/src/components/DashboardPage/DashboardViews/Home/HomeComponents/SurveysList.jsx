import SurveyTile from "./SurveyTile";

function SurveysList(props) {
  
  return (
    <div className="SurveysList row">
      {props.surveys.map((survey, index) => {
        console.log(survey._id);
        return (
          <SurveyTile
            key={index}
            title={survey.title}
            questions={survey.questions}
            id={survey._id}
          />
        );
      })}
    </div>
  );
}

export default SurveysList;
