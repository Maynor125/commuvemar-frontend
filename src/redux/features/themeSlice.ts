"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/* Obtén el estado inicial del tema desde localStorage
const loadDarkModeFromStorage = () => {
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  };

  interface ThemeState {
    darkMode: boolean;
  }

const initialState:ThemeState = {
  darkMode: loadDarkModeFromStorage(),
};*/
const storedDarkMode = typeof localStorage !== 'undefined' ? localStorage.getItem('darkMode') : null;
const initialState = {
  darkMode: storedDarkMode ? JSON.parse(storedDarkMode) : false,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toogleTheme: (state:any) => {
      state.darkMode = !state.darkMode;
       // Al cambiar el tema, también actualiza localStorage
       localStorage.setItem('darkMode', JSON.stringify(state.darkMode));
    },
  },
});

export const { toogleTheme } = themeSlice.actions;
export const selectDarkMode = (state:any) => state.theme.darkMode;
export default themeSlice.reducer;
