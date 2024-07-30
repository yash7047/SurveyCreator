import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";

function SidebarMenu({ loginCred }) {
  return (
    <div className="SidebarMenu">
      <Link className="SidebarMenu-Links btn" to="/dashboard">
        <FaIcons.FaHome />&nbsp;<span>Dashboard</span>
      </Link>
      {loginCred.username == "Ashok" && <Link className="SidebarMenu-Links btn" to="/survey-console">
        <FaIcons.FaChartLine />&nbsp;<span>Manage Surveys</span>
      </Link>}
    </div>
  );
}

export default SidebarMenu;
