"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";


const storedDarkMode = localStorage.getItem('darkMode');
const initialState = {
  darkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
       // Al cambiar el tema, también actualiza localStorage
       localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

export const { toogleTheme } = themeSlice.actions;
export const selectDarkMode = (state:any) => state.theme.darkMode;
export default themeSlice.reducer;
