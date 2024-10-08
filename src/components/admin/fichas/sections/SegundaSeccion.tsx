import { Box, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getDatosSection } from "@/services/datoSection";

interface Row {
  descripcion: string;
  realizacion: string;
  cantidad_observacion: string;
}

interface Props {
  titulo: string;
  traeCantidad: boolean;
  datos: Row[];
}

const SegundaSeccion: FC<Props> = ({ titulo, traeCantidad, datos }) => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const fichasState = useSelector((state: RootState) => state.fichasA.fichaAnalizada);

  const ObservacionName = traeCantidad
    ? "Cantidad / Observacion"
    : "Observacion";
  const columns = [
    {
      field: "descripcion",
      headerName: "Descripcion",
      headerClassName: fichasState
        ? "header-grid1"
        : "header-grid",
    },
    {
      field: "realizacion",
      headerName: "Realizacion",
      headerClassName: fichasState
        ? "header-grid1"
        : "header-grid",
      width: 120,
    },
    {
      field: "cantidad_observacion",
      headerName: ObservacionName,
      headerClassName: fichasState
        ? "header-grid1"
        : "header-grid",
      width: 400,
    },
  ];

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  const [descripciones, setDescripciones] = useState<Row[]>([]);

  useEffect(() => {
    if (datos) {
      const titulos = datos.map((obj) => ({
        descripcion: obj.descripcion,
        realizacion: obj.realizacion,
        cantidad_observacion: obj.cantidad_observacion,
      }));
      setDescripciones(titulos);
    }
  }, [datos]);

  return (
    <Box sx={{  display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        {titulo}
      </Typography>
      <Datatable
        columns={columns}
        rows={descripciones}
        getRowId={(row) => row.descripcion}
      />
    </Box>
  );
};

export default SegundaSeccion;
