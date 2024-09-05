import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const UnDecimaSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const tokenState = useSelector((state: RootState) => state.auth);
  const fichasState = useSelector((state: RootState) => state.fichasA.fichaAnalizada);

  const columns = [
    {
      field: "aspecto",
      headerName: "Aspecto",
      headerClassName: fichasState
      ? "header-grid1"
      : "header-grid",
      width: 600,
    },
    {
      field: "respuesta",
      headerName: "Respuesta",
      headerClassName: fichasState
      ? "header-grid1"
      : "header-grid",
      width: 95,
    },
    {
      field: "observacion",
      headerName: "Observacion",
      headerClassName: fichasState
      ? "header-grid1"
      : "header-grid",
      width: 300,
    },
  ];
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
    { aspecto: string; respuesta: string; observacion: string }[]
  >([]);

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  useEffect(() => {
    if (!tokenState.logueado) return;
    const fetchData = async () => {
      const data = await allGetData(15);
      setDataRows(data);
      const titulos = data.map((obj: any) => {
        const infoDato = infoDatosState.data.find(
          (info: any) => Number(info.IDDato) === Number(obj.id)
        );
        return {
          aspecto: obj.titulo,
          respuesta: infoDato ? infoDato.informacion : "",
          observacion: infoDato ? infoDato.descripcion : "",
        };
      });
      setDatos(titulos);
    };
    fetchData();
  }, [datos, infoDatosState]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Resposabilidad social
      </Typography>
      <Datatable
        columns={columns}
        rows={datos}
        getRowId={(row) => row.aspecto}
      />
    </Box>
  );
};

export default UnDecimaSeccion;
