'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
let storedDarkMode;

const initialState = {
  darkMode:false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
       // Al cambiar el tema, también actualiza localStorage
       if (typeof window !== "undefined") {
               localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
       }
    },
    setInitialDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
  },
});

export const { toogleTheme,setInitialDarkMode } = themeSlice.actions;
export const selectDarkMode = (state:any) => state.theme.darkMode;
export default themeSlice.reducer;
