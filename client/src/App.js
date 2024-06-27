import "./css/App.css";
import Header from "./components/Header";
import Survey from "./pages/Survey";
import SubmissionPage from "./pages/SubmissionPage";
import UserDashboard from "./pages/UserDashboard";
import SurveyCreator from "./pages/SurveyCreator";
import SurveyConsole from "./pages/SurveyConsole";
import SurveyResult from "./pages/SurveyResult";
import { Route, BrowserRouter as Router, Redirect } from "react-router-dom";
import SidebarMenu from "./components/DashboardPage/SidebarMenu";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body">
        
        <Router>
          <SidebarMenu />
          <Redirect from="/" to="/dashboard" />

          <Route path="/dashboard" component={UserDashboard} />

          <Route path="/survey-console" component={SurveyConsole} />

          <Route path="/survey" exact component={Survey} />

          <Route path="/create-survey" component={SurveyCreator} />

          <Route path="/survey-result" component={SurveyResult} />

          <Route path="/submission" component={SubmissionPage} />
        </Router>
      </div>
    </div>
  );
}

export default App;
