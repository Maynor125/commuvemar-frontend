import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const SeptimaSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const tokenState = useSelector((state: RootState) => state.auth);
  const fichaState = useSelector((state: RootState) => state.fichasA.fichaAnalizada);

  const allGetData = async (id: number) => {
    if (!tokenState.logueado) return [];
    try {
      const response = await getDatosSection(id);
      //console.log("datos de esta seccion", response.data);

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

  const [datos, setDatos] = useState<
    { practica: string; realizacion: string; cantidad_observacion: string }[]
  >([]);

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  useEffect(() => {
    if (!tokenState.logueado) return;
    const fetchData = async () => {
      const data = await allGetData(10);
      const titulos = data.map((obj: any) => {
        const infoDato = infoDatosState.data.find(
          (info: any) => Number(info.IDDato) === Number(obj.id)
        );
        return {
          practica: obj.titulo,
          realizacion: infoDato ? infoDato.informacion : "",
          cantidad_observacion: infoDato ? infoDato.descripcion : "",
        };
      });
      setDatos(titulos);
    };
    fetchData();
  }, [datos, infoDatosState]);

  const columns = [
    {
      field: "practica",
      headerName: "Practica",
      headerClassName: fichaState
        ? "header-grid1"
        : "header-grid",
      width: 333,
    },
    {
      field: "realizacion",
      headerName: "Realizacion",
      headerClassName: fichaState
        ? "header-grid1"
        : "header-grid",
      width: 333,
    },
    {
      field: "cantidad_observacion",
      headerName: "Cantidad / Observacion",
      headerClassName: fichaState
        ? "header-grid1"
        : "header-grid",
      width: 333,
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Conservación de Suelos, Agua y Medio Ambiente
      </Typography>
      <Datatable
        columns={columns}
        rows={datos}
        getRowId={(row) => row.practica}
      />
    </Box>
  );
};

export default SeptimaSeccion;
