import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import SurveyList from "../components/SurveyList";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <SurveyList />
    </DashboardLayout>
  );
}
