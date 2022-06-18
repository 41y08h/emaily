import React from "react";
import { Link } from "react-router-dom";

export default function SurveyFormSuccess() {
  return (
    <div className="d-flex flex-column align-items-center text-center">
      <i
        className="bi bi-patch-check-fill text-success"
        style={{ fontSize: "6rem" }}
      ></i>
      <h3 className="mt-4">Survey sent successfully</h3>
      <Link to="/dashboard" role="button" className="mt-4">
        Go to Dashboard
      </Link>
    </div>
  );
}
