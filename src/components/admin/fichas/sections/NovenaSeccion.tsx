import { RootState } from "@/redux/store/store";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const NovenaSeccion = () => {
  const theme = useTheme();
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const [valorTextF1, setValorTextF1] = useState("");
  const fichasState = useSelector((state: RootState) => state.fichas);

  useEffect(() => {
    // Encontrar el elemento en infoDatosState.data con IDDato igual a 57
    const elemento = infoDatosState.data.find(
      (item: any) => item.IDDato === 57
    );

    if (elemento) {
      setValorTextF1(elemento.informacion);
    }
  }, [infoDatosState]);

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
          control={<Checkbox checked={valorTextF1 === "Si"} readOnly />}
          label="Si"
        />
        <FormControlLabel
          checked={valorTextF1 === "No"}
          control={<Checkbox />}
          label="No"
        />
      </Box>
    </Box>
  );
};

export default NovenaSeccion;
