import React, { useState } from "react";
import { FaPortrait } from "react-icons/fa";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function Header({ loginCred, updateLoginCred }) {
  const [show, updateShow] = useState(false);
  const handleLogout = () => {
    updateLoginCred({
      username: "",
      password: "",
    });
    window.location.reload();
  };
  const showLogoutOption = () => {
    updateShow((prevState) => !prevState);
  };

  return (
    <div
      className="Header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1>Survey Project</h1>
      {loginCred.username != "" && (
        <DropdownButton
          style={{ marginRight: "2%" }}
          id="dropdown-basic-button"
          title={`Hi ${loginCred.username}`}
        >
          <Dropdown.Item eventKey="1" onClick={() => handleLogout()}>
            Logout
          </Dropdown.Item>
        </DropdownButton>
      )}
      {/* {loginCred.username != "" && (
        <div
          onClick={showLogoutOption}
          style={{
            top: "25px",
            color: "white",
            position: "absolute",
            right: "40px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          <FaPortrait />
          &nbsp;
          {loginCred.username}
          {show && (
            <span onClick={handleLogout} className="logout_span">
              Logout
            </span>
          )}
        </div>
      )} */}
    </div>
  );
}

export default Header;
