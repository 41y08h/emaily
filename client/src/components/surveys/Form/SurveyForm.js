import React from "react";
import { reduxForm } from "redux-form";
import SurveyField from "./SurveyField";
import { Link } from "react-router-dom";
import schema, { fields } from "./schema";
import validateEmails from "./validateEmails";

function SurveyForm({ handleSubmit, toggleFormReview }) {
  return (
    <form onSubmit={handleSubmit(toggleFormReview)}>
      {fields.map((field) => (
        <SurveyField key={field.name} {...field} />
      ))}
      <Link to="/surveys" className="red btn-flat white-text">
        Cancel
      </Link>
      <button type="submit" className="blue btn-flat right white-text">
        Next
        <i className="material-icons right">done</i>
      </button>
    </form>
  );
}

function validate(values) {
  const errors = {};

  // Validate with Joi
  const validation = schema.validate(values, { abortEarly: false });

  // Check for any errors
  if (validation.error)
    validation.error.details.forEach((t) => {
      // Assign error messages to each input fields
      // Replace any quotes provided by Joi
      errors[t.context.key] = t.message.replace('"', "").replace('"', "");
    });

  const emailKey = fields[3].name;

  errors[emailKey] = validateEmails(values[emailKey]);

  return errors;
}

export default reduxForm({
  validate,
  form: "surveyForm",
  destroyOnUnmount: false,
})(SurveyForm);
