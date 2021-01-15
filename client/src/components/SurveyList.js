import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../actions";

export default function SurveyList() {
  const dispatch = useDispatch();
  const surveys = useSelector((state) => state.surveys);

  useEffect(() => {
    dispatch(actions.fetchSurveys());
  }, []);

  return (
    <>
      {surveys.map((survey) => (
        <div className="card darken-1" key={survey._id}>
          <div className="card-content">
            <span className="card-title">{survey.title}</span>
            <p>{survey.body}</p>
            <p className="right">
              Sent On: {new Date(survey.dateSent).toLocaleDateString()}
            </p>
          </div>
          <div class="card-action">
            <a>YES: {survey.yes}</a>
            <a>NO: {survey.no}</a>
          </div>
        </div>
      ))}
    </>
  );
}
