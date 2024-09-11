'use client'

import React, { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { IconButton, useMediaQuery, useScrollTrigger } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const BotonFlotante = () => {
  const [visible, setVisible] = useState(false);
  const trigger = useScrollTrigger();

  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (typeof window !== 'undefined') { 
      const handleScroll = () => {
        setVisible(window.scrollY > 300); // Mostrar el botón después de desplazar 300px hacia abajo
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  
  const handleClick = () => {
    if (typeof window !== 'undefined') { // Check if we're on the client-side
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  const isSmallerThan1025 = useMediaQuery("(max-width: 1024px)");

  return (
    <IconButton
      onClick={handleClick}
      style={{
        color: "#fff",
        background: "#168CC8",
        position: "fixed",
        bottom: "20px",
        right: authState.logueado
          ? isSmallerThan1025
            ? "10px"
            : "20px"
          : isSmallerThan1025
          ? "20px"
          : "130px",
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
