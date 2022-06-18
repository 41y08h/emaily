import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  currentUser: null,
  error: null,
  loading: true,
};

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (props, thunkAPI) => {
    try {
      const res = await axios.get("/api/auth/currentuser");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateCredits(state, action) {
      state.item.credits = action.payload;
    },
  },
  extraReducers: {
    [fetchCurrentUser.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { updateCredits } = slice.actions;

export default slice.reducer;
