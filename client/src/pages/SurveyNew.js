import React, { useState } from "react";
import Layout from "../components/Layout";
import SurveyForm from "../components/SurveyForm";
import SurveyFormReview from "../components/SurveyFormReview";
import SurveyFormSuccess from "../components/SurveyFormSuccess";

export default function SurveyNew() {
  const [page, setPage] = useState(1);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipients, setRecipients] = useState("");

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => prev - 1);
  }

  return (
    <Layout>
      <div className="container pt-4">
        {page === 1 && (
          <SurveyForm
            {...{
              title,
              setTitle,
              subject,
              setSubject,
              body,
              setBody,
              recipients,
              setRecipients,
              nextPage,
            }}
          />
        )}
        {page === 2 && (
          <SurveyFormReview
            {...{ title, subject, body, recipients, prevPage, nextPage }}
          />
        )}
        {page === 3 && <SurveyFormSuccess />}
      </div>
    </Layout>
  );
}
