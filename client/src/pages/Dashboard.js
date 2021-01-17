import React from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import SurveyList from "../components/SurveyList";

export default function Dashboard() {
  return (
    <Layout>
      <div className="container py-3">
        <SurveyList />
        <Link
          to="/dashboard/new"
          style={{ position: "fixed", bottom: "20px", right: "20px" }}
        >
          <i className="bi bi-plus-square-fill display-5 shadow-lg" />
        </Link>
      </div>
    </Layout>
  );
}
