import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../api/Api";
import Cookies from "js-cookie";
import { sortbyOptions } from "../productConstants/ProductConstants";
import { RootState } from "./Store";

interface InitialState {
  activeOptionId: String;
  activeCategoryId: String;
  searchInput: String;
  activeRatingId: String;
  products: [];
  loading: Boolean;
  error: Boolean;
}

const initialState: InitialState = {
  activeOptionId: sortbyOptions[0].optionId,
  activeCategoryId: "",
  searchInput: "",
  activeRatingId: "",
  products: [],
  loading: true,
  error: false,
};

export const getProductsThunk = createAsyncThunk(
  "products",
  async (_, thunkApi) => {
    const jwtToken = Cookies.get("jwtToken");
    const { getState } = thunkApi;
    const state = getState() as RootState;
    const { productsSlice } = state;
    const { activeOptionId, activeCategoryId, searchInput, activeRatingId } =
      productsSlice;

    const productsApi =
      api +
      `?sort_by=${activeOptionId}&category=${activeCategoryId}&title_search=${searchInput}&rating=${activeRatingId}`;

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const response = await fetch(productsApi, options);
    const data = await response.json();
    return data;
  }
);

export const productsSlice = createSlice({
  name: "productsSlice",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategoryId = action.payload;
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setActiveRatingId: (state, action) => {
      state.activeRatingId = action.payload;
    },
    setActionOptionId: (state, action) => {
      state.activeOptionId = action.payload;
    },
    clearFilters: (state) => {
      state.activeCategoryId = "";
      state.searchInput = "";
      state.activeRatingId = "";
      state.activeOptionId = sortbyOptions[0].optionId;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProductsThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.products = action.payload;
    });
    builder.addCase(getProductsThunk.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getProductsThunk.pending, (state) => {
      state.loading = true;
      state.error = false;
    });
  },
});

export const {
  setCategory,
  setSearchInput,
  setActiveRatingId,
  setActionOptionId,
  clearFilters,
} = productsSlice.actions;

export default productsSlice.reducer;
