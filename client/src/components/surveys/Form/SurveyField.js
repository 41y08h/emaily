import React from "react";
import { Field } from "redux-form";

function InputComponent({ input, label, meta: { error, touched } }) {
  return (
    <>
      <label htmlFor={input.name}>{label}</label>
      <input type="text" {...input} className="validate" />
      {error && touched && (
        <div style={{ marginBottom: "20px" }} className="red-text">
          {error}
        </div>
      )}
    </>
  );
}

export default function SurveyField({ name, label }) {
  return <Field name={name} label={label} component={InputComponent} />;
}
