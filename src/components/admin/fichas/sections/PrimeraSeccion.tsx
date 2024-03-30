import { Label } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormLabel,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC } from "react";

interface FormControl{
  label: string;
  value: string;
}

const ReadOnlyTextField:FC<FormControl> =({ label, value}) =>{
  return (
    <Box sx={{ width: "100%" }}>
      <FormLabel sx={{ marginBottom: ".5rem" }}>{label}</FormLabel>
      <TextField
        value={value}
        InputProps={{
          readOnly: true, // Esto deshabilita la entrada de texto
        }}
        variant="outlined"
        fullWidth
      />
    </Box>
  );
}

const PrimeraSeccion = () => {
  const handleChange = (event:any) => {
    // Si el checkbox está marcado y se intenta desmarcar, lo volvemos a marcar
    if (event.target.checked === false) {
      event.preventDefault(); // Evitamos que el cambio de estado se propague
    }
  }
  const theme = useTheme();
  return (
    <Box sx={{display:'flex',flexDirection:'column',gap:'1rem'}}>
      <Typography variant="h6" color={theme.palette.secondary.light}>Datos Generales</Typography>
      <Box>
        <ReadOnlyTextField label="Productor" value="Juan Perez" />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Numero de cedula"
          value="610 - 120498 - 110F"
        />
        <ReadOnlyTextField label="Numero de telefono" value="6543 - 3455" />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField label="Comunidad" value="610 - 120498 - 110F" />
        <ReadOnlyTextField label="Nombre de la finca" value="6543 - 3455" />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Fecha de inspeccion"
          value="610 - 120498 - 110F"
        />
        <ReadOnlyTextField label="Codigo del productor" value="6543 - 3455" />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Area de cacao en produccion"
          value="610 - 120498 - 110F"
        />
        <ReadOnlyTextField
          label="Area de cacao en desarrollo"
          value="6543 - 3455"
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Fecha de ingreso al programa de certificacion"
          value="610 - 120498 - 110F"
        />
        <ReadOnlyTextField
          label="Producción Último ciclo (Qq baba) 2022-2023"
          value="6543 - 3455"
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <ReadOnlyTextField
          label="Estimado en cosecha"
          value="610 - 120498 - 110F"
        />
        <Box sx={{width:'50%'}}>
          <Typography color={theme.palette.secondary.contrastText}>Estado de certificacion</Typography>
          <FormControlLabel sx={{color:theme.palette.secondary.contrastText}} control={<Checkbox  onChange={handleChange} defaultChecked readOnly />} label="T1" />
          <FormControlLabel disabled control={<Checkbox />} label="T2" />
          <FormControlLabel disabled control={<Checkbox />} label="T3" />
          <FormControlLabel disabled control={<Checkbox />} label="Organico" />
        </Box>
      </Box>
      <Box>
      <ReadOnlyTextField
          label="Inspector"
          value="Juan Perez"
        />
      </Box>
    </Box>
  );
};

export default PrimeraSeccion;
