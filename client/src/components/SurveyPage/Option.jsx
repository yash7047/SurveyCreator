import React from "react";

function Option(props) {
  const { source, id, changeSelection, isSelected, questionType } = props;

  function onClicked() {
    console.log("clicked");
    changeSelection(id);
  }

  return (
    <div className="OptionsHolder">
      {questionType === "multiple" ? (
        <button
          onClick={onClicked}
          className={`btn btn-lg Option ${
            isSelected ? "active" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onClicked}
            className="option-checkbox"
          />
          {source}
        </button>
      ) : (
        <button
          onClick={onClicked}
          className={`btn btn-lg Option ${
            isSelected ? "active" : ""
          }`}
        >
          <input
            type="radio"
            checked={isSelected}
            onChange={onClicked}
            className="option-radio"
            name={`question-${id}`}
          />
          {source}
        </button>
      )}
    </div>
  );
}

export default Option;
