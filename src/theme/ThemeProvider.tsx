"use client";
import { useAppSelector } from "../redux/store/store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "../theme/index";
import {
  selectDarkMode,
  setInitialDarkMode,
} from "../redux/features/themeSlice";
import { useEffect, useState } from "react";
import { AppDispatch } from "../redux/store/store";
import { useDispatch } from "react-redux";

const ThemeProviderGlobal = ({ children }: { children: React.ReactNode }) => {
  // Obtén el estado del modo oscuro del store
  const darkMode = useAppSelector(selectDarkMode);
  const dispatch = useDispatch<AppDispatch>();
  const [initialDarkMode, setInitialDarkModeState] = useState(false);

  useEffect(() => {
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode !== null) {
      setInitialDarkModeState(JSON.parse(storedDarkMode));
    }
  }, []);

  useEffect(() => {
    dispatch(setInitialDarkMode(initialDarkMode));
  }, [initialDarkMode, dispatch]);

  // Crea el tema basado en el estado del modo oscuro
  const theme = createTheme(themeSettings(darkMode ? "dark" : "light"));

  // Efecto para cambiar el tema cuando cambia el modo oscuro
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light"
    );
  }, [darkMode]);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default ThemeProviderGlobal;
