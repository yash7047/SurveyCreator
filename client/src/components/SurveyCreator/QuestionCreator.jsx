import { useState } from "react";
import OptionCreator from "../../components/SurveyCreator/OptionCreator";

function QuestionCreator(props) {
  var [noOfOptions, setNoOfOptions] = useState(1);

  function handleTitleChange(event) {
    props.question.title = event.target.value;
  }

  function handleChangeInNoOfOptions(event) {
    setNoOfOptions(event.target.value);
  }

  function getOptionCreators(number) {
    var optionsList = [];
    for (var i = 0; i < number; i++) {
      optionsList.push(
        <OptionCreator key={i} index={i} onChange={handleOptionChange} />
      );
    }
    return optionsList;
  }

  function handleOptionChange(event) {
    props.question.options[event.target.id] = event.target.value;
  }

  return (
    <div className="QuestionCreator">
      <form>
        <div className="questionTitle">
          <label htmlFor="questionTitle" className="form-label">
            Question
          </label>
          <input
            type="text"
            className="form-control"
            id="questionTitle"
            onChange={handleTitleChange}
          ></input>
        </div>
        <div className="Options">
          <label htmlFor="noOfOptions">No of Options:</label>
          <input
            id="noOfOptions"
            type="number"
            className="input-group"
            min="1"
            max="15"
            value={noOfOptions}
            onChange={handleChangeInNoOfOptions}
          ></input>
        </div>

        {getOptionCreators(noOfOptions)}
      </form>
    </div>
  );
}

export default QuestionCreator;
