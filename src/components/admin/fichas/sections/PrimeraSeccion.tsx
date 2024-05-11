import { Label } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import { ReadOnlyTextField } from "../ReadOnlyInput";
import { FichaHeader } from "@/types/ficha";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getHeaderFicha } from "@/services/fichas";

interface Props {
  id: number;
  idTrabajador: number;
}

const PrimeraSeccion: FC<Props> = ({ id, idTrabajador }) => {
  const tokenState = useSelector((state: RootState) => state.auth);

  const handleChange = (event: any) => {
    // Si el checkbox está marcado y se intenta desmarcar, lo volvemos a marcar
    if (event.target.checked === false) {
      event.preventDefault(); // Evitamos que el cambio de estado se propague
    }
  };

  const [infoDatos, setInfoDatos] = useState<FichaHeader[]>([]);
  useEffect(() => {
    const getInfoDatosHeaderFicha = async () => {
      if (!tokenState.logueado) return [];
      try {
        const response = await getHeaderFicha(id);
        if (response.data === undefined) {
          return []; // Devolver un array vacío si no hay datos
        } else {
          console.log("datos de cabecera", response.data);
          setInfoDatos(response.data);
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    };
    getInfoDatosHeaderFicha();
  }, [id, tokenState]);

  const firstFichaHeader = infoDatos[0];
  const theme = useTheme();
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Datos Generales
      </Typography>
      <Box>
        <ReadOnlyTextField
          label="Productor"
          value={firstFichaHeader?.productor || ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Numero de cedula"
          value={firstFichaHeader?.cedula || ""}
        />
        <ReadOnlyTextField
          label="Numero de telefono"
          value={firstFichaHeader?.telefono || ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Comunidad"
          value={firstFichaHeader?.comunidad || ""}
        />
        <ReadOnlyTextField
          label="Nombre de la finca"
          value={firstFichaHeader?.finca || ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Fecha de inspeccion"
          value={firstFichaHeader?.fechaInspeccion || ""}
        />
        <ReadOnlyTextField
          label="Codigo del productor"
          value={String(firstFichaHeader?.codProductor) || ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Area de cacao en produccion"
          value={firstFichaHeader?.areaProduccion || ""}
        />
        <ReadOnlyTextField
          label="Area de cacao en desarrollo"
          value={firstFichaHeader?.areaDesarrollo || ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <ReadOnlyTextField
          label="Fecha de ingreso al programa de certificacion"
          value={firstFichaHeader?.ingresoCertificacion || ""}
        />
        <ReadOnlyTextField
          label="Producción Último ciclo (Qq baba) 2022-2023"
          value={firstFichaHeader?.produccionultimoCiclo || ""}
        />
      </Box>
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <ReadOnlyTextField
          label="Estimado en cosecha"
          value={firstFichaHeader?.estimadoCosecha || ""}
        />
        <Box sx={{ width: "50%" }}>
          <Typography color={theme.palette.secondary.contrastText}>
            Estado de certificacion
          </Typography>
          <FormControlLabel
            sx={{ color: theme.palette.secondary.contrastText }}
            control={
              <Checkbox
                onChange={handleChange}
                checked={firstFichaHeader?.estadoCertificacion === 1}
                readOnly
              />
            }
            label="T1"
          />
          <FormControlLabel
            checked={firstFichaHeader?.estadoCertificacion === 2}
            control={<Checkbox />}
            label="T2"
          />
          <FormControlLabel
            checked={firstFichaHeader?.estadoCertificacion === 3}
            control={<Checkbox />}
            label="T3"
          />
          <FormControlLabel
            checked={firstFichaHeader?.estadoCertificacion === 4}
            control={<Checkbox />}
            label="Organico"
          />
        </Box>
      </Box>
      <Box>
        <ReadOnlyTextField
          label="Inspector"
          value={firstFichaHeader?.inspector || ""}
        />
      </Box>
    </Box>
  );
};

export default PrimeraSeccion;
