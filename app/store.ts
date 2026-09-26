"use client";
import { configureStore } from "@reduxjs/toolkit";
import reducer from "./features/cart.slice";

export const store = configureStore({
  reducer: {
    cart: reducer,
  },
});
