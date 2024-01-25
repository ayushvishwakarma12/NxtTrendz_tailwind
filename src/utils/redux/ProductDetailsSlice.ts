import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { api } from "../api/Api";

export const getPoductDetailsThunk = createAsyncThunk(
  "productDetails",
  async (id: string | number) => {
    const jwtToken = Cookies.get("jwtToken");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(`${api}/${id}`, options);
    const data = await response.json();
    return data;
  }
);

const initialState = {
  productDetails: [],
  loading: true,
  error: false,
};

export const productDetailsSlice = createSlice({
  name: "productDetailsSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getPoductDetailsThunk.fulfilled, (state, action) => {
      (state.loading = false),
        (state.error = false),
        (state.productDetails = action.payload);
    });
    builder.addCase(getPoductDetailsThunk.pending, (state) => {
      (state.loading = true), (state.error = false);
    });
    builder.addCase(getPoductDetailsThunk.rejected, (state) => {
      (state.loading = false), (state.error = true);
    });
  },
});

export default productDetailsSlice.reducer;
