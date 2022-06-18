import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSurveyList } from "../store/reducers/survey";
import SurveyCard from "./SurveyCard";
import Loader from "./Loader";
import Error from "./Error";

export default function SurveyList() {
  const dispatch = useDispatch();
  const survey = useSelector((state) => state.entities.survey);

  useEffect(() => {
    if (survey.status === "idle") dispatch(fetchSurveyList());
  }, [dispatch, survey.status]);

  if (survey.status === "loading") return <Loader />;
  if (survey.error)
    return (
      <Error
        message={survey.error}
        retryHandler={() => dispatch(fetchSurveyList())}
      />
    );

  return survey.data.map((survey) => (
    <SurveyCard key={survey._id} {...{ survey }} />
  ));
}
