import { Box, Typography, useTheme } from "@mui/material";
import React, { FC, useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getDatosSection } from "@/services/datoSection";

interface Props {
  titulo: string;
  traeCantidad: boolean;
}

const SegundaSeccion: FC<Props> = ({ titulo, traeCantidad }) => {
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

  const allGetData = async (id: number) => {
    try {
      const response = await getDatosSection(id);
      console.log("datos de esta seccion", response.data);

      // Verificar si response.data es undefined
      if (response.data === undefined) {
        return []; // Devolver un array vacío si no hay datos
      } else {
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return []; // En caso de error, devolver un array vacío para evitar errores de tipo
    }
  };

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  useEffect(() => {
    const fetchData = async () => {
      const data = await allGetData(5);
      setDataRows(data);
      const titulos = data.map((obj: any) => ({
        descripcion: obj.titulo,
        realizacion: "",
        cantidad_observacion: "",
      }));
      setDescripciones(titulos);
    };
    fetchData();
  }, [dataRows]);

  const [descripciones, setDescripciones] = useState<
    { descripcion: string; realizacion: string; cantidad_observacion: string }[]
  >([]);
  console.log(descripciones);

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
