import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const stripePayment = createAsyncThunk(
  "billing/stripePayment",
  async (token, thunkAPI) => {
    try {
      const res = await axios.post("/api/billing/stripe", token);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export default stripePayment;
