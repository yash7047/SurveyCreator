import React from 'react';
import { FaPortrait } from 'react-icons/fa';

function Header({ loginCred }) {
    return <div className='Header'>
        <h1>Survey Creator</h1>
        {loginCred.username != "" && <div style={{ top: '25px',color: 'white', position: 'absolute', right: '40px' , fontSize: "20px"}}>
            <FaPortrait />&nbsp;
            {loginCred.username}
        </div>}
    </div>;
}

export default Header;