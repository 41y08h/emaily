import React from "react";
import { Spinner } from "react-bootstrap";

export default function Loader() {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center">
      <Spinner className="mx-2" animation="border" role="status" />
    </div>
  );
}
