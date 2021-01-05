import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Payments from "./Payments";

export default function Header() {
  const currentUser = useSelector((state) => state.auth);

  function renderContent() {
    switch (currentUser) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">👀 Login with Google</a>
          </li>
        );
      default:
        return (
          <>
            <li>
              <Payments />
            </li>
            <li style={{ margin: "0 10px" }}>Credits: {currentUser.credits}</li>
            <li>
              <a href="/api/logout">Logout</a>
            </li>
          </>
        );
    }
  }

  return (
    <nav className="z-depth-0">
      <div className="nav-wrapper container">
        <Link
          to={currentUser ? "/surveys" : "/"}
          className="left brand-logo"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          Emaily
        </Link>
        <ul className="right">{renderContent()}</ul>
      </div>
    </nav>
  );
}
