"use client";

import ProductorsForm from "@/components/forms/ProductorsForm";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

const Productors = () => {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(0);
  const [tituloDato, setTituloDato] = useState("");
  const [descripcionDato, setDescripcionDato] = useState("");
  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";
  return (
    <Box component="main">
      <Box
        sx={{
          paddingY: "1.5rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.secondary.light,
            }}
            variant="h5"
          >
            Productores
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
        <Box sx={{
          marginTop:'1rem'
        }}>
          <ProductorsForm/>
        </Box>
      </Box>
    </Box>
  );
};

export default Productors;
