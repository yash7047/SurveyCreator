import { Link } from "react-router-dom";

function SubmissionPage({ loginCred }) {

  return (
    <div>
      <h1 className="thankyou-text">Thank You</h1>
      <p>
        Thank you <strong>{loginCred.username}</strong> for taking the time out of your day to complete our
        short survey.We highly appreciate it <br /> Your suggestion really makes
        a difference. Please do participate in such surveys in future as well.
      </p>
      <Link to="/dashboard" className="link">
        <button className="btn btn-lg btn-success return-button">
          Return to Home page
        </button>
      </Link>
    </div>
  );
}

export default SubmissionPage;
