import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fields } from "./schema";
import * as actions from "../../../actions";
import { useHistory } from "react-router-dom";

export default function SurveyFormReview({ toggleFormReview }) {
  const { values } = useSelector((state) => state.form.surveyForm);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <div>
      <h5>Please review your entries carefully.</h5>
      {fields.map(({ name, label }) => (
        <div key={name}>
          <label>{label}</label>
          <div>{values[name]}</div>
        </div>
      ))}
      <button className="red btn-flat white-text" onClick={toggleFormReview}>
        Back
      </button>
      <button
        type="submit"
        className="green btn-flat right white-text"
        onClick={() =>
          dispatch(actions.sendSurvey(values, () => history.push("/surveys")))
        }
      >
        Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
}
