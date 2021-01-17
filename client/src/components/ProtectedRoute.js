import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const isAuthenticated = useSelector((state) => state.auth.item);
  if (isAuthenticated) return <Route {...rest} component={Component} />;
  return <Redirect to="/" />;
}
