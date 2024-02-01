"use client";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const FichasDetailData = () => {
  const theme = useTheme();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{
            fontWeight: 600,
            color: theme.palette.secondary.light,
          }}
          variant="subtitle1"
        >
          Entrega de fichas
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
            <Box
              sx={{
                width: "9px",
                height: "9px",
                backgroundColor: "#4FBD55",
                borderRadius: "50%",
              }}
              className="circle"
            ></Box>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: "14px",
              }}
            >
              Activo
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
            <Box
              sx={{
                width: "9px",
                height: "9px",
                backgroundColor: "#E83D21",
                borderRadius: "50%",
              }}
              className="circle"
            ></Box>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: "14px",
              }}
            >
              Inactivo
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default FichasDetailData;
