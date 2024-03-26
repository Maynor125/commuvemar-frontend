"use client";

import CardFicha from "@/components/admin/fichas/CardFichas";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Typography, useTheme } from "@mui/material";
import React from "react";


const HistoryFichas = () => {
  const theme = useTheme();
  return (
    <Box component="main">
      <Box
        sx={{
          marginTop: "1rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",

        }}
      >
        <Typography color={theme.palette.secondary.light} variant="h5">
          Historial de fichas levantadas
        </Typography>
      </Box>
      <Box sx={{
        marginTop:'1.5rem',
        display: "flex",
        gap:'1rem',
        paddingBottom: "1rem",
      }}>
        <CardFicha/>
        <CardFicha/>
      </Box>
    </Box>
  );
};

export default HistoryFichas;
