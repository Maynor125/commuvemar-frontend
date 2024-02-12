"use client";

import Avatars from "@/components/admin/avatar/Avatar";
import InspectorsForm from "@/components/forms/InspectorsForm";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const Inspectors = () => {
  const theme = useTheme();
  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.secondary.light,
          }}
        >
          Inspectores
        </Typography>
        <Button
          sx={{
            color: "#fff",
            backgroundColor: !isAgregate ? "#00A2DC" : "#D43333",
            "&:hover": {
              backgroundColor: !isAgregate ? "#0077b3" : "#a62a2a", // Cambia el color de fondo al pasar el cursor
            },
          }}
          variant="contained"
          onClick={() => setIsAgregate(!isAgregate)}
        >
          {texto}
        </Button>
      </Box>
      <Box>
        <InspectorsForm/>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          marginTop:'1rem'
        }}
      >
        <Box>
          <Typography>Anya Taylor</Typography>
          <Avatars />
          <Typography>Anya Adriana</Typography>
          <Typography>Taylor Jarquin</Typography>
          <Typography>+ 505 3456-2345</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Inspectors;
