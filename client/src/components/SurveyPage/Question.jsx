import React from "react";
import Option from "./Option";

function Question(props) {
  const { source, questionIndex, markAnswer, selectedOptions } = props;

  function clearSelection() {
    markAnswer(questionIndex, []);
  }

  function changeSelection(optionIndex) {
    const newSelections = [...selectedOptions];

    if (source.type === "multiple") {
      if (newSelections.includes(optionIndex)) {
        newSelections.splice(newSelections.indexOf(optionIndex), 1);
      } else {
        newSelections.push(optionIndex);
      }
    } else {
      newSelections[0] = optionIndex; // For single choice, only one selection is allowed
    }

    markAnswer(questionIndex, newSelections);
  }

  function handleCommentChange(e) {
    markAnswer(questionIndex, [e.target.value]);
  }

  return (
    <div className="Question">
      <h2>Question {questionIndex + 1}</h2>
      <h3>{source.title}</h3>

      {source.type === "comment" ? (
        <textarea
          value={selectedOptions[0] || ""}
          onChange={handleCommentChange}
          placeholder="Enter your comment here"
          rows="4"
          style={{ width: "100%" }}
        />
      ) : (
        <div>
          <p>
            {source.type === "multiple"
              ? "Select one or more options:"
              : "Select one option:"}
          </p>
          {source.options.map((option, index) => (
            <Option
              key={index}
              source={option}
              id={index}
              changeSelection={changeSelection}
              isSelected={selectedOptions.includes(index)}
              questionType={source.type}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Question;
