"use client";

import { Box, Typography, useTheme } from "@mui/material";
import React, { FC } from "react";
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
  return (
    <Box
      className="borde-card"
      sx={{
        width: "15rem",
        height: "9rem",
        padding: "1.5rem",
      }}
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
