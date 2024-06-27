import React from 'react';

function Option(props) {

    function onClicked() {
        props.changeSelection(props.id);
    }

    return <div className='OptionsHolder'>
        <button onClick={onClicked} className={'btn btn-lg Option btn-outline-dark'}>{props.source}</button>
    </div>;
}

export default Option;