import "./css/App.css";
import Header from "./components/Header";
import Survey from "./pages/Survey";
import SubmissionPage from "./pages/SubmissionPage";
import UserDashboard from "./pages/UserDashboard";
import SurveyCreator from "./pages/SurveyCreator";
import SurveyConsole from "./pages/SurveyConsole";
import SurveyResult from "./pages/SurveyResult";
import SidebarMenu from "./components/DashboardPage/SidebarMenu";
import LoginComponent from "./pages/LoginComponent";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import authenticatorClient from "./service/authenticator-api-client";
import { useState } from "react";

function App() {

  const [loginCred, updateLoginCred] = useState({
    username: '', password: ''
  })
  const SecuredRoute = ({ children }) => {
      let location = useLocation();

      if (authenticatorClient.isAuthenticated) {
          return children;
      } else {
          return <Navigate to="/login" state={{ from: location }} />;
      }
  };

  return (
    
      <div className="App">
        <Header loginCred={loginCred} updateLoginCred={updateLoginCred} />
        <div className="body">
          <Router>
            <Routes>
              {/* Redirect from "/" to "/dashboard" */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              {/* Use element instead of component */}
              <Route path="/dashboard" element={<SecuredRoute><UserDashboard loginCred={loginCred} /></SecuredRoute>} />
              <Route path="/survey-console" element={<SurveyConsole />} />
              <Route path="/survey" element={<Survey loginCred={loginCred} />} />
              <Route path="/create-survey" element={<SurveyCreator />} />
              <Route path="/survey-result" element={<SurveyResult />} />
              <Route path="/submission" element={<SubmissionPage loginCred={loginCred} />} />

              <Route path="login" element={<LoginComponent updateLoginCred={updateLoginCred} />} />
            </Routes>
          </Router>
          
        </div>
      </div>
  );
}

export default App;