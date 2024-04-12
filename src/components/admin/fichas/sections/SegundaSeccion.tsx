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
  datos:Row[];
}

const SegundaSeccion: FC<Props> = ({ titulo, traeCantidad,datos }) => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const fichasState = useSelector((state: RootState) => state.fichas);

  const ObservacionField = traeCantidad
    ? "cantidad_observacion"
    : "observacion";
  const ObservacionName = traeCantidad
    ? "Cantidad / Observacion"
    : "Observacion";
  const columns = [
    {
      field: "descripcion",
      headerName: "Descripcion",
      headerClassName: fichasState.AlanizadaFichas
        ? "header-grid1"
        : "header-grid",
    },
    {
      field: "realizacion",
      headerName: "Realizacion",
      headerClassName: fichasState.AlanizadaFichas
        ? "header-grid1"
        : "header-grid",
      width: 120,
    },
    {
      field: ObservacionField,
      headerName: ObservacionName,
      headerClassName: fichasState.AlanizadaFichas
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
        realizacion: "",
        cantidad_observacion: "",
      }));
      setDescripciones(titulos);
    }
  }, [datos]);



  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        {titulo}
      </Typography>
      <Datatable columns={columns} rows={descripciones} getRowId={(row)=>row.descripcion}/>
    </Box>
  );
};

export default SegundaSeccion;
