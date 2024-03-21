"use client";

import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton, useScrollTrigger } from "@mui/material";

const BotonFlotante = () => {
  const [visible, setVisible] = useState(false);
  const trigger = useScrollTrigger();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // Mostrar el botón después de desplazar 300px hacia abajo
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <IconButton
      onClick={handleClick}
      style={{
        color: "#fff",
        background: "#168CC8",
        position: "fixed",
        bottom: "20px",
        right: "20px",
        borderRadius: "5px",
        opacity: trigger ? 1 : 0,
        transition: "opacity 0.3s ease",
      }}
    >
      <KeyboardDoubleArrowUpIcon />
    </IconButton>
  );
};

export default BotonFlotante;
