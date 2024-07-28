import React, { useState } from "react";

const QuestionCreator = ({ question, index, setQuestionList }) => {
  const [questionTitle, setQuestionTitle] = useState(question.title || "");
  const [questionType, setQuestionType] = useState(question.type || "single");
  const [options, setOptions] = useState(question.options || [""]);

  const handleQuestionTitleChange = (e) => {
    setQuestionTitle(e.target.value);
    updateQuestion("title", e.target.value);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
    updateQuestion("type", e.target.value);
  };

  const handleOptionChange = (optionIndex, newValue) => {
    const newOptions = options.map((opt, idx) =>
      idx === optionIndex ? newValue : opt
    );
    setOptions(newOptions);
    updateQuestion("options", newOptions);
  };

  const handleAddOption = () => {
    const newOptions = [...options, ""];
    setOptions(newOptions);
    updateQuestion("options", newOptions);
  };

  const handleRemoveOption = (optionIndex) => {
    const newOptions = options.filter((_, idx) => idx !== optionIndex);
    setOptions(newOptions);
    updateQuestion("options", newOptions);
  };

  const updateQuestion = (field, value) => {
    setQuestionList((prevList) =>
      prevList.map((q, idx) =>
        idx === index ? { ...q, [field]: value } : q
      )
    );
  };

  return (
    <div className="questionCreator">
      <h3>Question {index + 1}</h3>
      <div>
        <label>Question Title:</label>
        <input
          type="text"
          value={questionTitle}
          onChange={handleQuestionTitleChange}
          required
        />
      </div>

      <div>
        <label>Question Type:</label>
        <select value={questionType} onChange={handleQuestionTypeChange}>
          <option value="single">Single Choice</option>
          <option value="multiple">Multiple Choice</option>
          <option value="comment">Comment</option>
        </select>
      </div>

      {(questionType === "single" || questionType === "multiple") && (
        <div>
          <label>Options:</label>
          {options.map((option, idx) => (
            <div key={idx}>
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(idx, e.target.value)}
                required
              />
              {options.length > 1 && (
                <button type="button" style={{ margin: "12px" }} onClick={() => handleRemoveOption(idx)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={handleAddOption} style={{ margin: "12px" }}>
            Add Option
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionCreator;
