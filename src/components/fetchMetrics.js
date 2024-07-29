import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMetrics = createAsyncThunk(
  "admin/fetchMetrics",
  async () => {
    const response = await axios.get("http://backend.test/api/metrics", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token if needed
      },
    });
    return response.data;
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    metrics: {
      totalUsers: 0,
      totalSignatures: 0,
      signaturesPerMonth: [],
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMetrics.fulfilled, (state, action) => {
      state.metrics = action.payload;
    });
  },
});

export default adminSlice.reducer;
