import React, { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewSurvey, createSurvey } from "../store/reducers/survey";
import { updateCredits } from "../store/reducers/auth";

export default function SurveyFormReview({
  title,
  subject,
  body,
  recipients,
  prevPage,
  nextPage,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  function sendSurvey() {
    dispatch(
      createNewSurvey(
        { title, subject, body, recipients },
        () => setLoading(true),
        (data) => {
          dispatch(createSurvey(data.survey));
          dispatch(updateCredits(data.credits));
          nextPage();
        },
        () => {},
        () => {
          setLoading(false);
        }
      )
    );
  }

  return (
    <>
      <h5>Please review your form entries.</h5>
      <div className="mt-3">
        <i className="bi bi-blockquote-left"></i> Survey Title
        <input className="w-100 p-2 mt-2" disabled value={title} />
      </div>
      <div className="mt-3">
        <i className="bi bi-blockquote-left"></i> Email Subject
        <input className="w-100 p-2 mt-2" disabled value={subject} />
      </div>
      <div className="mt-3">
        <i className="bi bi-chat-left-dots-fill"></i> Email Body
        <input className="w-100 p-2 mt-2" disabled value={body} />
      </div>
      <div className="mt-3">
        <i className="bi bi-people-fill"></i> Email Recipients
        <input className="w-100 p-2 mt-2" disabled value={recipients} />
      </div>
      <div className="d-flex justify-content-between mt-4">
        <Button variant="secondary" onClick={prevPage}>
          Back
        </Button>
        <Button variant="primary" onClick={sendSurvey} disabled={loading}>
          {loading ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            <>
              Send Survey <i className="bi bi-arrow-right-square-fill"></i>
            </>
          )}
        </Button>
      </div>
    </>
  );
}
