import React, { useState } from 'react';
import { FaPortrait } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

function Header({ loginCred, updateLoginCred }) {
    
    const [show, updateShow] = useState(false)
    // const naviagte = useNavigate()
    const handleLogout = () => {
        updateLoginCred({
            username: '', password: ''
        })
        // naviagte("/login");
    };
    const showLogoutOption = () => {
        updateShow(prevState => !prevState)
    }

    return <div className='Header'>
        <h1>Survey Creator</h1>
        {loginCred.username != "" && <div onClick={showLogoutOption} style={{ top: '25px',color: 'white', position: 'absolute', right: '40px' , fontSize: "20px", cursor:"pointer"}}>
            <FaPortrait />&nbsp;
            {loginCred.username}
            {show && <span onClick={handleLogout} className='logout_span'>Logout</span>}
        </div>}
        
    </div>;
}

export default Header;