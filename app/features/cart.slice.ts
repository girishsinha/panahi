"use client";
import { createSlice } from "@reduxjs/toolkit";
import { Product } from "@/models/product";

interface CartState {
  cartLength: number;
  totalValue: number;
  cartItems: Product[];
}

const loadInitialState = (): CartState => {
  if (typeof window !== "undefined") {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        return JSON.parse(savedCart);
      } catch (error) {
        console.error("Failed to parse cart from localStorage", error);
      }
    }
  }
  return {
    cartLength: 0,
    totalValue: 0,
    cartItems: [],
  };
};
// const initialState: CartState = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart") || "")
//   : {
//       cartLength: 0,
//       totalValue: 0,
//       cartItems: [],
//     };
const initialState: CartState = loadInitialState();
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
        localStorage.setItem("cart", JSON.stringify(state));
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
      localStorage.setItem("cart", JSON.stringify(state));
    },
    EmptyCart: (state) => {
      state.cartItems = [];
      state.cartLength = 0;
      state.totalValue = 0;
      localStorage.setItem("cart", JSON.stringify(state));
    },
  },
});

export const { addToCart, removeFromCart, EmptyCart } = cartSlice.actions;
export default cartSlice.reducer;
