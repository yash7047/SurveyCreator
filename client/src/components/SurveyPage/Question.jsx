import React from "react";
import Option from './Option';

function Question(props) {

    function clearSelection() {
        props.markAnswer(null);
    }

    /*document.onclick = function () {
        if (document.activeElement.tagName !== 'BUTTON') {
            clearSelection();
        }
    }*/

    function changeSelection(selectedOptionID) {
        props.markAnswer(selectedOptionID);
    }

    return <div className='Question'>
        <h2>Question {props.questionIndex + 1}</h2>
        {/* <h3>{props.source.title}</h3> */}
        {
            props.source.options.map(
                (option, index) => <Option source={option} key={index} id={index}
                    changeSelection={changeSelection} />
            )
        }
    </div>;
}
export default Question;