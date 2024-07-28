import React, { useState } from "react";
import QuestionCreator from "../components/SurveyCreator/QuestionCreator";
import { storeSurvey } from "../service/BackendService";
import { FaPlus } from "react-icons/fa";
import { v4 as generateId } from "uuid";
import { useNavigate } from "react-router-dom";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";
import CustomModal from "../components/CustomModal";

function SurveyCreator() {
  const navigate = useNavigate(); // Updated from var to const
  const [title, setTitle] = useState("");
  const [questionList, setQuestionList] = useState([]); // Updated from var to const

  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const addQuestionCreator = () => {
    if (questionList.length > 0) {
      const lastQuestion = questionList[questionList.length - 1];

      // Check if the last question has options for single or multiple choice types
      if (
        (lastQuestion.type === "single" || lastQuestion.type === "multiple") &&
        lastQuestion.options.length === 0
      ) {
        alert("Please add options to the previous question before adding a new one.");
        return;
      }

      // Check if the last question has a title for comment type questions
      if (lastQuestion.type === "comment" && lastQuestion.title.trim() === "") {
        alert("Please add a question title for the comment type before adding a new one.");
        return;
      }
    }

    // Add a new question template
    setQuestionList([
      ...questionList,
      {
        title: "",
        options: [],
        type: "single",
      },
    ]);
  };

  const submitSurvey = () => {
    if (questionList.length === 0 || title.length === 0) {
      console.log("Title or questions are missing.");
      return;
    }
    const createdSurvey = {
      _id: generateId(),
      title: title,
      questions: questionList,
    };
    storeSurvey(createdSurvey)
      .then((data) => {
        console.log("Survey saved successfully:", data);
        setShowModal(true); // Show modal after successful survey creation
      })
      .catch((e) => {
        console.error("Error storing survey:", e);
      });
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
    navigate("/dashboard"); // Navigate to dashboard after closing modal
  };

  return (
    <>
      <SidebarMenu />
      <div className="SurveyCreator">
        <h1>You are at Survey Creator page</h1>

        <div className="surveyTitle">
          <label htmlFor="surveyTitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="surveyTitle"
            onChange={handleTitleChange}
            value={title} // Added value to synchronize state
          />
        </div>

        {questionList.map((question, index) => (
          <QuestionCreator
            key={index}
            index={index}
            question={question}
            setQuestionList={setQuestionList}
          />
        ))}
        <button
          className="btn btn-info addQuestionCreatorButton"
          onClick={addQuestionCreator}
        >
          <FaPlus />
          <span>Add</span>
        </button>
        {questionList.length !== 0 && (
          <button
            className="submitButton btn btn-outline-success"
            onClick={submitSurvey}
          >
            Submit
          </button>
        )}

        {/* Custom Modal */}
        <CustomModal
          show={showModal}
          handleClose={handleCloseModal}
          title="Survey Created"
          body="Your survey has been created successfully!"
        />
      </div>
    </>
  );
}

export default SurveyCreator;
