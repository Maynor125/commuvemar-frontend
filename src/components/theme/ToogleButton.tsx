"use client";
import { useDispatch } from "react-redux";
import { toogleTheme } from "@/redux/features/themeSlice";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";

//Iconos a usar para el toogle mode
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ToogleButton = () => {
  // Obtén el estado inicial del tema desde localStorage
  const loadDarkModeFromStorage = () => {
    const storedDarkMode = localStorage.getItem("darkMode");
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  };

  const stateMode = loadDarkModeFromStorage();
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const handleToogle = () => {
    dispatch(toogleTheme());
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <Tooltip
        title={`pasar al ${stateMode ? "modo claro" : "modo oscuro"}`}
      >
        <IconButton aria-label="tooglemode" onClick={handleToogle}>
          {stateMode ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ToogleButton;
