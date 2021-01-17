import React, { useEffect } from "react";
import { Button, Card, ProgressBar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveyList } from "../store/reducers/survey";

function derivePercentage(main, total) {
  return (main / total) * 100;
}

function calculateDays(timeString) {
  const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const dayAgo = Math.round(
    Math.abs((Date.now() - new Date(timeString)) / oneDay)
  );

  return dayAgo + (dayAgo > 1 ? " days" : " day") + " ago";
}

function calculateHours(timeString) {
  const oneHour = 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
  const hourAgo = Math.round(
    Math.abs((Date.now() - new Date(timeString)) / oneHour)
  );

  return hourAgo + (hourAgo > 1 ? " hours" : " hour") + " ago";
}

export default function SurveyList() {
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.entities.survey);
  const fetchData = () => {
    dispatch(fetchSurveyList());
  };

  useEffect(() => {
    if (survey.loading) fetchData();
  }, []);

  if (survey.loading) return <p className="text-center mt-5">Loading ...</p>;
  if (survey.error)
    return (
      <div className="text-center mt-3">
        <p>{survey.error}</p>
        <Button variant="light" size="sm" onClick={fetchData}>
          Retry
        </Button>
      </div>
    );

  return survey.items.map(
    ({ title, subject, body, yes, no, dateSent, lastResponded }) => (
      <Card className="mb-2 shadow-sm" key={title}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{subject}</Card.Subtitle>
          <Card.Text>{body}</Card.Text>

          <ProgressBar>
            <ProgressBar
              variant="warning"
              now={derivePercentage(yes, yes + no)}
            />
            <ProgressBar
              variant="danger"
              now={derivePercentage(no, yes + no)}
            />
          </ProgressBar>
          <div className="d-flex justify-content-between mt-2">
            <Card.Text>Yes {yes}</Card.Text>
            <Card.Text>No {no}</Card.Text>
          </div>
          <div className="d-flex justify-content-between mt-2">
            <Card.Text>Sent {calculateDays(dateSent)}</Card.Text>
            {lastResponded && (
              <Card.Text>
                Last Response {calculateHours(lastResponded)}
              </Card.Text>
            )}
          </div>
        </Card.Body>
      </Card>
    )
  );
}
