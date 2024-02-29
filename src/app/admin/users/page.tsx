'use client'

import UserForm from '@/components/forms/UserForm'
import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'

const page = () => {
    const theme = useTheme();

    const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";
  return (
    <Box component='main'>
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
        <UserForm/>
      </Box>
 
    </Box>
  )
}

export default page