import React from "react";
import Home from "../components/DashboardPage/DashboardViews/Home/Home";
import SidebarMenu from "../components/DashboardPage/SidebarMenu";

function UserDashboard({ loginCred }) {
  return (
    <>
        <SidebarMenu loginCred={loginCred} />
        <div className="UserDashboard">
          <div className="DashboardView">
            <Home loginCred={loginCred} />
          </div>
        </div>
    </>
    
  );
}

export default UserDashboard;
