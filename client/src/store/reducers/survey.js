import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchSurveyList = createAsyncThunk(
  "survey/fetchSurveyList",
  async (props, thunkAPI) => {
    try {
      const { data } = await axios.get("/api/survey");
      return data;
    } catch ({ response: data }) {
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const createSurvey = createAsyncThunk(
  "survey/createSurvey",
  async (props, thunkAPI) => {
    try {
      const response = await axios.post("/api/survey", props);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

const slice = createSlice({
  name: "survey",
  initialState,

  extraReducers: {
    [fetchSurveyList.pending]: (state, action) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchSurveyList.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "complete";
    },
    [fetchSurveyList.rejected]: (state, action) => {
      state.error = action.payload;
      state.status = "failed";
    },
    [createSurvey.fulfilled]: (state, action) => {
      state.data.push(action.payload.survey);
    },
  },
});

export default slice.reducer;
