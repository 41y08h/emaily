import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../components/Header";

export default function Index() {
  const { currentUser } = useSelector((state) => state.auth);
  if (currentUser) return <Redirect to="/dashboard" />;

  return (
    <>
      <Header />
      <div className="d-flex flex-column container pt-100">
        <img
          className="mx-auto mt-5 rounded mw-100"
          src="https://source.unsplash.com/500x300/?network"
          alt="network"
        />
        <h3 className="text-center mx-auto mt-2rem">
          Collect Feedback From Your Users Blazing Fast
        </h3>
      </div>
    </>
  );
}
