import { configureStore } from "@reduxjs/toolkit";
import productsSlice from "./ProductsSlice";
import ProductDetailsSlice from "./ProductDetailsSlice";
import CartSlice from "./CartSlice";

export const store = configureStore({
  reducer: { productsSlice, ProductDetailsSlice, CartSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
