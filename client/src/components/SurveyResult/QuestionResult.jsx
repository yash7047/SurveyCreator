import ProgressBar from "./ProgressBar";

function QuestionResult(props) {
  const { question, result } = props;

  let totalResponses = result.reduce((a, b) => a + b, 0);
  totalResponses = totalResponses == 0 ? 1 : totalResponses

  return (
    <div className="QuestionResult">
      <h2 className="QuestionTitle">{question.title}</h2>

      {question.type !== "comment" ? (
        // Handle multiple-choice and single-choice options
        question.options.map((option, index) => (
          <div key={index}>
            <h3 className="Choices">{option}</h3>
            <ProgressBar
              bgcolor="blue"
              progress={(result[index] / totalResponses) * 100}
            />
          </div>
        ))
      ) : (
        // Handle comments
        <div>
          <h3 className="Choices">Comments:</h3>
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
