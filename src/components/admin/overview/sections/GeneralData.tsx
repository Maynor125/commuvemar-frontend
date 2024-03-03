"use client";

import React, { useState } from "react";
import Card1 from "../Card1";
import { Box, Typography, useTheme } from "@mui/material";
import Card2 from "../Card2";

import imgcar1 from "../../../../../public/images/admin/succesficha.png";
import imgcar2 from "../../../../../public/images/admin/change.png";
import imgcar3 from "../../../../../public/images/admin/newficha.png";
import imgcar4 from "../../../../../public/images/admin/newjob.png";

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
        <Card2 customColor="#FFE6E6" />
        <Card2 customColor="#BEF9C1" />
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Card1
          title="Fichas aprovadas"
          iconPath={imgcar1}
          customColor="#303F9F"
          value={8}
          porcentaje="12"
        />
        <Card1 
        title="Nuevas fichas" 
        iconPath={imgcar3} 
        customColor="#26A4DA"
        value={9} 
        porcentaje="10"/>
        <Card1 
        title="Cambios" 
        iconPath={imgcar2} 
        customColor="#4FBD55"
        value={12} 
        porcentaje="15"/>
        <Card1
          title="Nuevos usuarios"
          iconPath={imgcar4}
          customColor="#EF2515"
          value={6}
          porcentaje="8"
        />
      </Box>
    </div>
  );
};

export default GeneralData;
