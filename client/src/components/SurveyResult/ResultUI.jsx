import QuestionResult from "./QuestionResult";
function ResultUI(props) {

  return (
    <div>
      <h1>{props.survey.survey.title}</h1>
      {
        props.survey.survey.questions.map((question, index) => {
          return (
            <QuestionResult question={question} result={props.results[index]} />
          )
        }) 
      }
    </div>
  );
}

export default ResultUI;
