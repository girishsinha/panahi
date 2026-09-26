"use client";
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/models/product";

interface CartState {
  cartLength: number;
  totalValue: number;
  cartItems: Product[];
}

const initialState: CartState = {
  cartLength: 0,
  totalValue: 0,
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (!state.cartItems.find((item) => item._id === action.payload._id)) {
        state.cartItems.push(action.payload);
        state.totalValue = state.cartItems.reduce(
          (x, y) => x + (y.salePrice || 0),
          0,
        );
        state.cartLength = state.cartItems.length;
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item._id !== action.payload._id,
      );
      state.cartLength = state.cartItems.length;
      state.totalValue = state.cartItems.reduce(
        (x, y) => x + (y.salePrice || 0),
        0,
      );
    },
    EmptyCart: (state) => {
      state.cartItems = [];
      state.cartLength = 0;
      state.totalValue = 0;
    },
  },
});

export const { addToCart, removeFromCart, EmptyCart } = cartSlice.actions;
export default cartSlice.reducer;
