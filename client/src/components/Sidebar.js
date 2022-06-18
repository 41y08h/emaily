import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentButton from "./PaymentButton";

function DashboardItem({ children }) {
  return <div className="d-block py-3 px-5 bb-gray hover-gray">{children}</div>;
}

function SidebarHeader() {
  return (
    <div className="d-block pb-4 py-2 px-5 bg-light bb-gray">
      <Link to="/dashboard" className="text-dark">
        <i className="bi bi-mailbox2 display-6" />
        <span className="mx-3">Emaily</span>
      </Link>
    </div>
  );
}

export default function Sidebar() {
  const { currentUser } = useSelector((state) => state.auth);

  return (
    <div className="col-2 p-0 br-gray sidebar">
      <SidebarHeader />
      <DashboardItem>Credits : {currentUser.credits}</DashboardItem>
      <DashboardItem>
        <PaymentButton />
      </DashboardItem>
      <DashboardItem>
        <Link to="/dashboard/new">New Survey</Link>
      </DashboardItem>
      <DashboardItem>
        <a href="/api/auth/logout">Logout</a>
      </DashboardItem>
    </div>
  );
}
