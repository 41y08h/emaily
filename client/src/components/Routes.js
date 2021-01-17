import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "../pages/Index";
import Authorization from "./Authorization";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
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
      </Authorization>
    </BrowserRouter>
  );
}
