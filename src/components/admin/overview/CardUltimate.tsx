"use client";

import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { FC, useState } from "react";
import { SVGProps } from "react";

interface CardProps {
  customColor?: string;
  backgroundColor?: string;
  iconPath:JSX.Element;
  title: string;
  value: string;
  span: string;
  lastText: string;
}

const CardUltimate: FC<CardProps> = ({
  customColor,
  backgroundColor,
  value,
  title,
  iconPath,
  lastText,
  span,
}) => {
  const theme = useTheme();
  const fontColor1 = theme.palette.secondary.light;
  const fontColor2 = theme.palette.secondary.contrastText;
  const isSmallerThan1025 = useMediaQuery("(max-width: 600px)");

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <Box
      className="borde-card"
      sx={{
        width: '100%',
        height: "9rem",
        padding: "1.5rem",
        cursor: "pointer",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{
            display:'flex',
            flexDirection: 'column',
            gap:'.6rem'
        }}>
          <Typography color={fontColor2}>{title}</Typography>
          <Typography variant="h5" color={fontColor1}>
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            width: "40px",
            height: "40px",
            background: backgroundColor,
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.2s ease",
            transform: hovered ? "rotate(3deg)" : "rotate(0)",
          }}
        >
         {iconPath}
        </Box>
      </Box>
      <Typography sx={{fontSize:'15px',marginTop:'.6rem'}} color={fontColor2}>
        <span style={{ fontWeight: "600",color:customColor }}>{span}</span> {lastText}
      </Typography>
    </Box>
  );
};

export default CardUltimate;
