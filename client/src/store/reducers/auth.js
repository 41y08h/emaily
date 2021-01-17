import { createSlice } from "@reduxjs/toolkit";
import apiCall from "../apiCall";

const initialState = {
  item: null,
  error: null,
  loading: true,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    getCurrentUser(state, action) {
      state.item = action.payload;
      state.loading = false;
    },
    errorOccurred(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    updateCredits(state, action) {
      state.item.credits = action.payload;
    },
  },
});

const { getCurrentUser, errorOccurred } = slice.actions;

export const { updateCredits } = slice.actions;

export const fetchCurrentUser = () =>
  apiCall({
    url: "/auth/currentuser",
    onSuccess: [getCurrentUser.type],
    onError: [errorOccurred.type],
  });

export default slice.reducer;
