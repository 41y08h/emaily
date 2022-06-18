import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import IndexPage from "../pages/Index";
import Authorization from "./Authorization";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import SurveyNew from "../pages/SurveyNew";

export default function Routes() {
  return (
    <BrowserRouter>
      <Authorization>
        <Switch>
          <Route exact path="/" component={IndexPage} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/new" component={SurveyNew} />
        </Switch>
        <ToastContainer />
      </Authorization>
    </BrowserRouter>
  );
}
