"use client";
import { useDispatch } from "react-redux";
import { toogleTheme } from "@/redux/features/themeSlice";
import { useState } from "react";
import { IconButton, Tooltip, useTheme } from "@mui/material";

//Iconos a usar para el toogle mode
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';

const ToogleButton = () => {
  // Obtén el estado inicial del tema desde localStorage
  const loadDarkModeFromStorage = () => {
    if (typeof window !== 'undefined') {
      const storedDarkMode = localStorage.getItem('darkMode');
      return storedDarkMode ? JSON.parse(storedDarkMode) : false;
    }
    return false;
    };

  const stateMode = loadDarkModeFromStorage();
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const handleToogle = () => {
    dispatch(toogleTheme());
    setDarkMode(!darkMode);
  };

  const theme = useTheme();
  return (
    <div>
      <Tooltip
        title={`pasar al ${stateMode ? "modo claro" : "modo oscuro"}`}
      >
        <IconButton sx={{color:theme.palette.secondary.dark}} aria-label="tooglemode" onClick={handleToogle}>
          {stateMode ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default ToogleButton;
