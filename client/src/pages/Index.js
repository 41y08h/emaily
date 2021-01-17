import React from "react";
import Layout from "../components/Layout";

export default function Index() {
  return (
    <>
      <Layout />
      <div className="container d-flex flex-column">
        <img
          className="mx-auto mt-5 rounded mw-100"
          src="https://source.unsplash.com/500x300/?network,globe"
          alt="network"
        />
        <h3 className="text-center mx-auto" style={{ marginTop: "2rem" }}>
          Collect Feedback From Your Users Blazing Fast
        </h3>
      </div>
    </>
  );
}
