import SurveyTableRow from "./SurveyTableRow";

function SurveysTable(props) {
  return (
    <table className="table table-hover" style={{marginTop: "30px"}}>
      <thead>
        <tr>
          <th scope="col">S.No.</th>
          <th scope="col">Title</th>
          <th scope="col">Respondents</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {props.surveys.map((survey, index) => {
          return(
            <SurveyTableRow
            index={index+1}
            title={survey.title}
            respondents={survey.responses.length}
            survey={survey}
          />)
        }
        )}
      </tbody>
    </table>
  );
}

export default SurveysTable;
