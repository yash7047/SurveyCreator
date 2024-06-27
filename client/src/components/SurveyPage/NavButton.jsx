import React from 'react';

function NavButton(props) {
    return <button className='NavButton btn btn-outline-secondary' onClick={props.onClick}>
        {props.title}
    </button>;
}

export default NavButton;