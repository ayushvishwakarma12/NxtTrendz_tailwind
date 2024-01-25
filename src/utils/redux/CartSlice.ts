import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { productInterface } from "../../components/Product/Product";

interface ItemsInCartInterFace {
  itemsInCart: {
    product: productInterface;
    count: number;
  }[];
}

const initialState: ItemsInCartInterFace = {
  itemsInCart: [],
};

interface AddToCartPayload {
  product: productInterface;
  count: number;
}

const CartSlice = createSlice({
  name: "CartSlice",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { product, count } = action.payload;
      const existingItemIndex = state.itemsInCart.findIndex(
        (item) => item.product?.id === product.id
      );
      if (existingItemIndex !== -1) {
        state.itemsInCart[existingItemIndex].count += count;
      } else {
        state.itemsInCart.push({ product, count });
      }
    },
    removeItem: (state, action: PayloadAction<productInterface>) => {
      const product = action.payload;
      const items = state.itemsInCart.filter((item) => {
        return item.product.id !== product.id;
      });
      state.itemsInCart = items;
    },
    removeAllItems: (state) => {
      state.itemsInCart = [];
    },
    increaseItemInCart: (state, action: PayloadAction<productInterface>) => {
      const product = action.payload;
      const itemIndex = state.itemsInCart.findIndex(
        (item) => item.product?.id === product.id
      );

      state.itemsInCart[itemIndex].count += 1;
    },
    decreaseItemInCart: (state, action: PayloadAction<productInterface>) => {
      const product = action.payload;
      const itemIndex = state.itemsInCart.findIndex(
        (item) => item.product?.id === product.id
      );
      if (state.itemsInCart[itemIndex].count > 1) {
        state.itemsInCart[itemIndex].count -= 1;
      } else {
        state.itemsInCart.splice(itemIndex, 1);
      }
    },
  },
});

export const {
  addToCart,
  removeItem,
  removeAllItems,
  increaseItemInCart,
  decreaseItemInCart,
} = CartSlice.actions;

export default CartSlice.reducer;
