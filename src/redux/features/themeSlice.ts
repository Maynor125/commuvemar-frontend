"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const initialState = {
  darkMode: false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toogleTheme } = themeSlice.actions;
export default themeSlice.reducer;
