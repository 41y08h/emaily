import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../apiCall";

const initialState = {
  items: [],
  loading: true,
  error: null,
};

const slice = createSlice({
  name: "survey",
  initialState,
  reducers: {
    startFetching(state) {
      state.loading = true;
      state.error = null;
    },
    getSurveyList(state, action) {
      state.items = action.payload;
      state.loading = false;
    },
    errorOccurred(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    createSurvey(state, action) {
      state.items.push(action.payload);
    },
  },
});

export const {
  startFetching,
  getSurveyList,
  errorOccurred,
  createSurvey,
} = slice.actions;

export default slice.reducer;

export const fetchSurveyList = () =>
  apiCall({
    url: "/survey",
    onStart: startFetching.type,
    onSuccess: [getSurveyList.type],
    onError: [errorOccurred.type],
  });

export const createNewSurvey = (data, onStart, onSuccess, onError, onEnd) =>
  apiCall({
    url: "/survey",
    method: "post",
    data,
    onStart,
    onSuccess: [createSurvey.type, onSuccess],
    onError: [onError],
    onEnd,
  });
