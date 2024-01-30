'use client'


import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const Welcome = () => {
  const obtenerSaludo = () => {
    var fecha = new Date();
    var hora = fecha.getHours();

    var saludo;

    if (hora >= 5 && hora < 12) {
      saludo = "Buenos días";
    } else if (hora >= 12 && hora < 18) {
      saludo = "Buenas tardes";
    } else {
      saludo = "Buenas noches";
    }

    return saludo;
  };

  var nombre = "Lana";
  var saludoFinal = obtenerSaludo() + " " + nombre;

  const theme = useTheme();
  return <Box sx={{marginBottom:'.5rem'}}>
    <Typography sx={{
        fontWeight:500,
        color:theme.palette.secondary.light
    }}  variant="h5">
     {saludoFinal}
    </Typography>
    <Typography sx={{color:theme.palette.secondary.contrastText,fontSize:'13px'}} variant="body2">
    Hope you have a good day
    </Typography>
  </Box>;
};

export default Welcome;
