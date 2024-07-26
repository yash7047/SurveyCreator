import QuestionResult from "./QuestionResult";

function ResultUI(props) {
  const { survey, results } = props;

  return (
    <div>
      <h1>{survey.survey.title}</h1>
      {survey.survey.questions.map((question, index) => {
        return (
          <QuestionResult
            key={index}
            question={question}
            result={results[index]}
          />
        );
      })}
    </div>
  );
}

export default ResultUI;
