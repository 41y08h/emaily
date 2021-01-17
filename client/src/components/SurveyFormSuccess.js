import React from "react";
import { Link } from "react-router-dom";

export default function SurveyFormSuccess() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <i
        className="bi bi-check2-circle text-success"
        style={{ fontSize: "6rem" }}
      ></i>
      <h3 className="display-5">Survey sent successfully</h3>
      <Link to="/dashboard" role="button" className="mt-4 btn btn-success">
        Go to Dashboard
      </Link>
    </div>
  );
}
