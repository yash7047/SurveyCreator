import ProgressBar from "./ProgressBar";

function QuestionResult(props) {
  const { question, result } = props;

  let totalResponses = result.reduce((a, b) => a + b, 0);
  totalResponses = totalResponses == 0 ? 1 : totalResponses

  return (
    <div className="QuestionResult">
      <h4 className="QuestionTitle">{question.title}</h4>

      {question.type !== "comment" ? (
        // Handle multiple-choice and single-choice options
        question.options.map((option, index) => (
          <div key={index}>
            <h4 className="Choices">{option}</h4>
            <ProgressBar
              bgcolor="blue"
              progress={(result[index] / totalResponses) * 100}
            />
          </div>
        ))
      ) : (
        // Handle comments
        <div>
          <h6 style={{fontStyle: 'italic'}}>Following are the comments replied by users on this question:</h6>
          {result.map((comment, index) => (
            <div key={index} className="Comment">
              <p>{comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuestionResult;
