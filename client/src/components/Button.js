import React from "react";
import { Button as BootstrapButton, Spinner } from "react-bootstrap";

export default function Button({ children, disabled, loading, ...rest }) {
  return (
    <BootstrapButton {...rest} disabled={loading || disabled}>
      {children}
      {loading && (
        <Spinner className="mx-2" animation="border" role="status" size="sm" />
      )}
    </BootstrapButton>
  );
}
