import QuestionResult from "./QuestionResult";

function ResultUI(props) {
  const { survey, results } = props;

  return (
    <div>
      <h1>Here are the results for the survey <span style={{color:"#007bff"}}>{survey.survey.title}</span></h1>
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
