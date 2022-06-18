import { isRejected } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const toastMiddleware = () => (next) => (action) => {
  if (isRejected(action)) toast.error(action.payload);
  return next(action);
};

export default toastMiddleware;
