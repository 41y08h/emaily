import React from "react";
import { Spinner } from "react-bootstrap";

export function Loader() {
  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <Spinner animation="border" role="status" size="sm" />
    </div>
  );
}

export function Error({ message }) {
  return (
    <div
      className="d-flex align-items-center justify-content-center flex-column"
      style={{ height: "100vh", width: "100vw" }}
    >
      {message}
      <a href="/" className="btn btn-light btn-sm mt-2">
        Retry
      </a>
    </div>
  );
}
