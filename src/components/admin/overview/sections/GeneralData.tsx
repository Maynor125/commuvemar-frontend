"use client";

import React, { useState } from "react";
import Card1 from "../Card1";
import { Box, Typography, useTheme } from "@mui/material";

const GeneralData = () => {
  const theme = useTheme();
  const [isDateActive, setIsDateActive] = useState(true);
  return (
    <div>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{ fontWeight: 600, color: theme.palette.secondary.light }}
          variant="subtitle1"
        >
          Datos generales
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
          <button className="btn-fecha">
            <Typography
              sx={{
                color: isDateActive
                  ? "#00A2DC"
                  : theme.palette.secondary.contrastText,
                fontSize: "14px",
              }}
            >
              Week
            </Typography>
          </button>
          <button className="btn-fecha">
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: "14px",
              }}
            >
              Month
            </Typography>
          </button>
          <button className="btn-fecha">
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: "14px",
              }}
            >
              Year
            </Typography>
          </button>
        </Box>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Card1 customColor="#CC0000" />
        <Card1 customColor="#26A4DA" />
        <Card1 customColor="#4FBD55" />
        <Card1 customColor="#26A4DA" />
      </Box>
    </div>
  );
};

export default GeneralData;
