import React, { useState } from "react";
import { reduxForm } from "redux-form";
import SurveyForm from "./Form/SurveyForm";
import SurveyFormReview from "./Form/SurveyFormReview";

function SurveyNew() {
  const [showReviewForm, setShowReviewForm] = useState(false);

  function toggleFormReview() {
    setShowReviewForm((prev) => !prev);
  }

  if (showReviewForm)
    return <SurveyFormReview toggleFormReview={toggleFormReview} />;
  return <SurveyForm toggleFormReview={toggleFormReview} />;
}

export default reduxForm({
  form: "surveyForm",
})(SurveyNew);
