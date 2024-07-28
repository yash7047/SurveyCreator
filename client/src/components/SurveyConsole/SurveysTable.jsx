import React, { useState, useEffect } from "react";
import SurveyTableRow from "./SurveyTableRow";
import { getSurveys } from "../../service/BackendService";
import CustomModal from "../CustomModal";

function SurveyTable() {
  const [surveys, setSurveys] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", body: "" });

  useEffect(() => {
    // Fetch surveys from the backend on component mount
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const surveysData = await getSurveys();
      setSurveys(surveysData);
    } catch (error) {
      console.error("Failed to fetch surveys:", error.message);
    }
  };

  const handleDeleteSurvey = (surveyId) => {
    // Update state to remove the deleted survey
    setSurveys((prevSurveys) => prevSurveys.filter((survey) => survey._id !== surveyId));

    // Show modal with confirmation message
    setModalContent({
      title: "Survey Deleted",
      body: "The survey has been successfully deleted.",
    });
    setModalShow(true);
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Respondents</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey, index) => (
            <SurveyTableRow
              key={survey._id}
              survey={survey}
              index={index + 1}
              title={survey.title}
              respondents={survey.responses ? survey.responses.length : 0}
              onDelete={handleDeleteSurvey} // Pass down the delete handler
            />
          ))}
        </tbody>
      </table>

      {/* Render Custom Modal */}
      <CustomModal
        show={modalShow}
        handleClose={() => setModalShow(false)}
        title={modalContent.title}
        body={modalContent.body}
      />
    </div>
  );
}

export default SurveyTable;
