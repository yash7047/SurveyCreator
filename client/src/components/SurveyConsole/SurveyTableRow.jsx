import { FaDumpster } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { deleteSurveyById } from "../../service/BackendService";

function SurveyTableRow(props) {
  var history = useNavigate();
  function onClick() {
    history("/survey-result", {
      state: {
        survey: props.survey,
      }
    });
  }

  const deleteSurvey = (event) => {
    event.stopPropagation()
    if(window.confirm('Are you sure you want to delete this survey?')){
      deleteSurveyById(props.survey._id)
      .then((res) => alert(res.message))
    }
    else {
      console.log("cancel click")
    }
  }

  return (
    <tr onClick={onClick} className="cp">
      <th scope="row">{props.index}</th>
      <td>{props.title}</td>
      <td>{props.respondents}</td>
      <td title="Delete survey" onClick={(event) =>{deleteSurvey(event)}}><FaDumpster /></td>
    </tr>
  );
}

export default SurveyTableRow;
