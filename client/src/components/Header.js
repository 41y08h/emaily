import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Navbar fixed="top" className="shadow-sm pb-3 bg-light">
      <div className="container">
        <Link to="/">
          <Navbar.Brand>
            <i className="bi bi-mailbox2 display-6 mx-3"></i>
            Emaily
          </Navbar.Brand>
        </Link>
        <Navbar.Collapse className="justify-content-end">
          <a
            className="btn btn-primary btn-sm"
            role="button"
            href="/api/auth/google"
          >
            Login with Google
          </a>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
