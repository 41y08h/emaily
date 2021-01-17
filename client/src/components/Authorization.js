import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../store/reducers/auth";
import { Loader } from "./FullScreens";

export default function Authorization({ children }) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  if (auth.loading) return <Loader />;
  return children;
}
