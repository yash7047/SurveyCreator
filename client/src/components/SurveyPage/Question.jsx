import React from "react";
import Option from "./Option";

function Question(props) {
  const { source, questionIndex, markAnswer, selectedOptions } = props;

  function changeSelection(optionIndex) {
    let newSelections = [...selectedOptions];

    if (source.type === "multiple") {
      if (newSelections.includes(optionIndex)) {
        newSelections = newSelections.filter((index) => index !== optionIndex);
      } else {
        newSelections.push(optionIndex);
      }
    } else {
      newSelections = [optionIndex]; // For single choice, only one selection is allowed
    }

    markAnswer(questionIndex, newSelections);
  }

  function handleCommentChange(e) {
    markAnswer(questionIndex, [e.target.value]);
  }

  return (
    <div className="Question">
      <h4>Question {questionIndex + 1}</h4>
      <h4>{source.title}</h4>

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
          <h6 style={{fontWeight: 'normal'}}>
            {source.type === "multiple"
              ? "Select one or more options:"
              : "Select one option:"}
          </h6>
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
