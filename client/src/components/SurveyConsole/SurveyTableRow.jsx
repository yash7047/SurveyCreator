import { useHistory } from "react-router-dom";

function SurveyTableRow(props) {
  var history = useHistory();
  function onClick() {
    history.push({
      pathname: "/survey-result",
      state: {
        survey: props.survey,
      },
    });
  }

  return (
    <tr onClick={onClick}>
      <th scope="row">{props.index}</th>
      <td>{props.title}</td>
      <td>{props.respondents}</td>
      <td>{props.status}</td>
    </tr>
  );
}

export default SurveyTableRow;
