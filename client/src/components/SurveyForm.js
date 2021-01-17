import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

export default function SurveyForm({
  title,
  setTitle,
  subject,
  setSubject,
  body,
  setBody,
  recipients,
  setRecipients,
  nextPage,
}) {
  const [recipientsFieldError, setRecipientsFieldError] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    if (recipientsFieldError) return;
    nextPage();
  }

  function setField(setFunction) {
    return (e) => {
      setFunction(e.target.value);
    };
  }

  function validateRecipients(value) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // Remove empty elements
    const invalidEmails = value
      .split(",")
      .map((t) => t.trim())
      .filter((t) => !re.test(t) && t !== "");

    if (invalidEmails.length)
      return `These are invalid emails: ${invalidEmails.join(" | ")}`;

    return;
  }

  function onRecipientsChange(e) {
    setRecipientsFieldError(validateRecipients(e.target.value));
    setRecipients(e.target.value);
  }

  return (
    <>
      <h2 className="display-6 mb-4 text-center">Send a new Survey</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>
            <i className="bi bi-blockquote-left"></i> Survey Title
          </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={setField(setTitle)}
            value={title}
            placeholder="This title will appear on your dashboard"
          />
        </Form.Group>
        <Form.Group controlId="subject" className="mt-3">
          <Form.Label>
            <i className="bi bi-card-text"></i> Email Subject
          </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={setField(setSubject)}
            value={subject}
            placeholder="eg. Our mid-night drama"
          />
        </Form.Group>
        <Form.Group controlId="body" className="mt-3">
          <Form.Label>
            <i className="bi bi-chat-left-dots-fill"></i> Email Body
          </Form.Label>
          <Form.Control
            type="text"
            required
            onChange={setField(setBody)}
            value={body}
            placeholder="eg. Do you need extra props?"
          />
        </Form.Group>
        <Form.Group controlId="recipients" className="mt-3">
          <Form.Label>
            <i className="bi bi-people-fill"></i> Email Recipients
          </Form.Label>
          <Form.Control
            as="textarea"
            required
            rows={3}
            onChange={onRecipientsChange}
            value={recipients}
            placeholder="Comma separated list of recipients' emails"
          />
          {recipientsFieldError && (
            <Form.Text className="text-danger" muted>
              {recipientsFieldError}
            </Form.Text>
          )}
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3 w-100">
          Next <i className="bi bi-arrow-right"></i>
        </Button>
      </Form>
    </>
  );
}
