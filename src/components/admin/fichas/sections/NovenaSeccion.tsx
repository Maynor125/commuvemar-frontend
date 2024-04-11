import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";

const NovenaSeccion = () => {
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Transporte de la cosecha
      </Typography>
      <Box sx={{ width: "100%" }}>
        <Typography color={theme.palette.secondary.contrastText}>
          ¿Contrata transporte?
        </Typography>
        <FormControlLabel
          sx={{ color: theme.palette.secondary.contrastText }}
          control={<Checkbox defaultChecked readOnly />}
          label="Si"
        />
        <FormControlLabel disabled control={<Checkbox />} label="No" />
      </Box>
    </Box>
  );
};

export default NovenaSeccion;
