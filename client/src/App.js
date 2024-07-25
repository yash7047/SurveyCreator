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

function App() {

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
      <Header />
      <div className="body">
        <Router>
          <SidebarMenu />
          <Routes>
            {/* Redirect from "/" to "/dashboard" */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />

            {/* Use element instead of component */}
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/survey-console" element={<SurveyConsole />} />
            <Route path="/survey" element={<SecuredRoute><Survey /></SecuredRoute>} />
            <Route path="/create-survey" element={<SecuredRoute><SurveyCreator /></SecuredRoute>} />
            <Route path="/survey-result" element={<SurveyResult />} />
            <Route path="/submission" element={<SubmissionPage />} />

            {/* Secure route example */}
            {/* <Route path="/admin" element={<SecuredRoute><AdminComponent /></SecuredRoute>} /> */}

            <Route path="login" element={<LoginComponent />} />
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;