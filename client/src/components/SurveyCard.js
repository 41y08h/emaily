import React from "react";
import { Card, ProgressBar } from "react-bootstrap";
import {
  calculateDays,
  calculateHours,
  derivePercentage,
  numberWithCommas,
} from "../utils/helper-fns";

export default function SurveyCard({
  survey: { title, subject, body, yes, no, dateSent, lastResponded, isDraft },
}) {
  return (
    <Card
      className="mb-4 shadow-sm"
      bg={!isDraft && "light"}
      style={{ borderRadius: "12px" }}
    >
      <Card.Header className="px-4 py-3 border-bottom-0">
        {isDraft ? (
          "Draft"
        ) : (
          <>
            Sent <i className="bi bi-check"></i>
          </>
        )}
      </Card.Header>
      <Card.Body className="p-4">
        <Card.Title className="mb-4">{title}</Card.Title>
        <Card.Subtitle className="mb-3 text-muted">
          <i className="bi bi-chat-square-quote-fill"></i>
          <span className="mx-3">{subject}</span>
        </Card.Subtitle>
        <Card.Text className="bg-white p-2 border">{body}</Card.Text>

        {!isDraft && (
          <>
            <ProgressBar style={{ height: "3rem", borderRadius: "12px" }}>
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
              <Card.Text style={{ fontSize: ".9rem" }}>
                {numberWithCommas(yes)} People said yes
              </Card.Text>
              <Card.Text style={{ fontSize: ".9rem" }}>
                {numberWithCommas(no)} People said no
              </Card.Text>
            </div>
            <div
              className="d-flex justify-content-between mt-3"
              style={{ fontSize: "0.9rem" }}
            >
              <Card.Text>
                <i
                  className="bi bi-calendar-date"
                  style={{ fontSize: "1.5rem" }}
                ></i>
                <span className="mx-3">Sent {calculateDays(dateSent)}</span>
              </Card.Text>
              {lastResponded && (
                <Card.Text>
                  Last Response {calculateHours(lastResponded)}
                </Card.Text>
              )}
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}
