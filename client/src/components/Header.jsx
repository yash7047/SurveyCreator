import React from 'react';
import { FaPortrait } from 'react-icons/fa';

function Header({ loginCred }) {
    return <div className='Header'>
        <h1>Survey Creator</h1>
        {loginCred.username == "manish" && <div style={{ top: '25px',color: 'white', position: 'absolute', right: '40px' }}>
            <FaPortrait />&nbsp;
            {loginCred.username}
        </div>}
    </div>;
}

export default Header;