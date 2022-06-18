import React from "react";
import Sidebar from "./Sidebar";
import "../dashboard.css";

export default function DashboardLayout({ children }) {
  return (
    <div className="row mw-100 dashboard">
      <Sidebar />
      <main className="col px-5 pt-5">{children}</main>
    </div>
  );
}
