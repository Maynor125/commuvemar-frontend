"use client";

import { RootState, store } from "./store/store";
import { Provider, useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";
import { useEffect, useState } from "react";
import { useAppSelector } from "./store/store";
import useLocalStorage from "@/hooks/useLocalStorage";

/*const extraccionTheme = store.getState().theme.darkMode
  ? "dark"
  : "light";
const theme = createTheme(themeSettings(extraccionTheme));*/

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const [localdarkMode, setLocalDarkMode] = useLocalStorage("darkMode", false);

  // Obtiene el estado del tema del store
  const darkMode = useAppSelector(selectDarkMode);

  const [theme, setTheme] = useState(
    createTheme(themeSettings(localdarkMode ? "dark" : "light"))
  );

  useEffect(() => {
    setTheme(createTheme(themeSettings(localdarkMode ? "dark" : "light")));
  }, [localdarkMode]);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
