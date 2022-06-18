import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers";
import toast from "./middlewares/toast";

const customMiddlewares = [toast];

export default configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), ...customMiddlewares],
});
