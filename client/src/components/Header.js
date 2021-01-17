import React from "react";
import { Navbar, Button, Nav } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PaymentButton from "./PaymentButton";

function AuthContent({ currentUser }) {
  return (
    <>
      <Link to="/dashboard" className="nav-link">
        Dashboard
      </Link>
      <Navbar.Text>Credits: {currentUser.credits}</Navbar.Text>
      <PaymentButton>
        <Button variant="danger" size="sm" className="mx-3 text-white">
          Buy Credits
        </Button>
      </PaymentButton>
      <a
        className="btn btn-secondary btn-sm"
        role="button"
        href="/api/auth/logout"
      >
        Logout
      </a>
    </>
  );
}

function PublicContent() {
  return (
    <a className="btn btn-primary btn-sm" role="button" href="/api/auth/google">
      Login with Google
    </a>
  );
}

export default function Header() {
  const currentUser = useSelector((state) => state.auth.item);
  return (
    <Navbar bg="light" className="shadow-sm">
      <div className="container">
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand>Emaily</Navbar.Brand>
        </Link>
        <Navbar.Collapse className="justify-content-end">
          {currentUser ? (
            <AuthContent currentUser={currentUser} />
          ) : (
            <PublicContent />
          )}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}
