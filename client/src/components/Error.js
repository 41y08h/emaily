import React from "react";
import { Button } from "react-bootstrap";

export default function Loader({ message, retryHandler }) {
  return (
    <div className="w-100 h-100 d-flex align-items-center justify-content-center flex-column">
      {message}
      <Button variant="dark" className="mt-2" size="sm" onClick={retryHandler}>
        Retry
      </Button>
    </div>
  );
}
