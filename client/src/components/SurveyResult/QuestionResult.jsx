import ProgressBar from "./ProgressBar";
function QuestionResult(props) {
    return (
        <div className="QuestionResult">
            <h2 className="QuestionTitle">{props.question.title}</h2>
            {props.question.options.map((option,index) => {
                return <div >
                    <h3 className="Choices">{option}</h3>
                    <ProgressBar bgcolor="blue" progress={props.result[index] / props.result.reduce((a, b) => a + b, 0)* 100} />
                </div>
            })}
        </div>
    )
}

export default QuestionResult;