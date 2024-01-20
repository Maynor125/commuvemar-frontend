"use client";
import { useDispatch } from "react-redux";
import { toogleTheme } from "@/redux/features/themeSlice";
import { useState } from "react";
import { IconButton } from "@mui/material";

//Iconos a usar para el toogle mode
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const ToogleButton = () => {
  const [darkMode, setDarkMode] = useState(false);
  const dispatch = useDispatch();
  const handleToogle = () => {
    dispatch(toogleTheme());
    setDarkMode(!darkMode);
  };
  return (
    <div>
      <IconButton aria-label="tooglemode" onClick={handleToogle}>
        {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </div>
  );
};

export default ToogleButton;
