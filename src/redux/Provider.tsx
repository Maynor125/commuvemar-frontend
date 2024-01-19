"use client";

import { store } from "./store/store";
import { Provider } from "react-redux";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { themeSettings } from "@/theme";

const extraccionTheme = store.getState().theme.darkMode
  ? "dark"
  : "light";
const theme = createTheme(themeSettings(extraccionTheme));

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default ReduxProvider;
