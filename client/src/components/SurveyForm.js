import React, { useState } from "react";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import { Card, Form } from "react-bootstrap";
import { object, string } from "yup";
import { validateRecipients } from "../utils/helper-fns";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { createSurvey } from "../store/reducers/survey";
import { unwrapResult } from "@reduxjs/toolkit";
import { Link } from "react-router-dom";
import SurveyFormSuccess from "./SurveyFormSuccess";

const schema = object().shape({
  title: string().required().label("Survey Title"),
  subject: string().required().label("Email Subject"),
  body: string().required().label("Email Body"),
  recipients: string()
    .test("test-name", (value, context) => {
      const { path, createError } = context;
      const error = validateRecipients(value);
      return error ? createError({ path, message: error }) : true;
    })
    .required()
    .label("Recipients"),
});

const fields = [
  {
    name: "title",
    label: "Survey Title",
    placeholder: "A title that will appear on your dashboard",
  },
  {
    name: "subject",
    label: "Email Subject",
    placeholder: "A subject that will be shown to your users",
  },
  {
    name: "body",
    label: "Email Body",
    placeholder: "eg. Did your receive your props?",
  },
  {
    name: "recipients",
    label: "Recipients",
    placeholder: "Comma separated list of recipients' emails",
    isTextarea: true,
    rows: 4,
  },
];

const initialValues = {
  title: "Something is a title maybe",
  subject: "Our plan became a hit",
  body: "Do you know our plan",
  recipients: "someone@example.com",
};

function SurveyField({ label, isTextarea, ...rest }) {
  return (
    <Form.Group className="mb-2">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type="text"
        as={isTextarea ? "textarea" : "input"}
        className="bg-light p-2"
        {...rest}
      />
      <ErrorMessage
        component={Form.Text}
        className="text-danger"
        name={rest.name}
      />
    </Form.Group>
  );
}

export default function SurveyForm() {
  const [step, setStep] = useState(1);
  const pages = [PageOne, PageTwo, SurveyFormSuccess];
  const CurrentPage = pages[step];
  const dispatch = useDispatch();

  function prevStep() {
    setStep((page) => page - 1);
  }
  function nextStep() {
    setStep((page) => page + 1);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting }) => {
        // Submit form if it is second last
        // step, as last step is success step
        if (step === 1) {
          try {
            await dispatch(createSurvey(values));
            setSubmitting(false);
            nextStep();
          } catch {
            setSubmitting(false);
          }
        } else {
          nextStep();
        }
      }}
    >
      {(props) => (
        <FormikForm>
          <CurrentPage {...{ prevStep, nextStep }} {...props} />
        </FormikForm>
      )}
    </Formik>
  );
}

function PageOne() {
  return (
    <>
      <h5 className="mb-4">Create and send a new survey</h5>
      {fields.map((field, i) => (
        <Field key={i} as={SurveyField} {...field} />
      ))}
      <div className="d-flex justify-content-end">
        <Link to="/dashboard" className="btn btn-dark mx-2" role="button">
          Cancel
        </Link>
        <Button type="submit">Next</Button>
      </div>
    </>
  );
}

function PageTwo({ values, isSubmitting, prevStep }) {
  return (
    <>
      <h5 className="mb-4">Please review your entries carefully</h5>
      <Card
        className="mb-4 shadow-sm"
        bg="light"
        style={{ borderRadius: "12px" }}
      >
        <Card.Header className="px-4 py-3 border-bottom-0">
          New Survey
        </Card.Header>
        <Card.Body className="p-4">
          <Card.Title className="mb-4">{values.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            <i className="bi bi-chat-square-quote-fill"></i>
            <span className="mx-3">{values.subject}</span>
          </Card.Subtitle>
          <Card.Text className="bg-white p-2 border">{values.body}</Card.Text>
        </Card.Body>
      </Card>
      <div className="d-flex justify-content-end">
        <Button
          variant="dark"
          className="mx-2"
          disabled={isSubmitting}
          onClick={prevStep}
        >
          Back
        </Button>
        <Button type="submit" loading={isSubmitting}>
          Send Survey
        </Button>
      </div>
    </>
  );
}
