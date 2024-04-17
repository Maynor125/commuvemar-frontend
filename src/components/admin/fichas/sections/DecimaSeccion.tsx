import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const DecimaSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);

  const allGetData = async (id: number) => {
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
    { desecho: string; destinoFinal: string }[]
  >([]);

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  useEffect(() => {
    const fetchData = async () => {
      const data = await allGetData(14);
      setDataRows(data);
      const titulos = data.map((obj: any) => {
        const infoDato = infoDatosState.data.find((info: any) => Number(info.IDDato) === Number(obj.id))
        return{
             desecho: obj.titulo,
        destinoFinal: infoDato ? infoDato.informacion : "",
        }
     
      });
      setDatos(titulos);
    };
    fetchData();
  }, [dataRows,infoDatosState]);

  const columns = [
    {
      field: "desecho",
      headerName: "Desecho",
      headerClassName: "header-grid",
      width: 250,
    },
    {
      field: "destinoFinal",
      headerName: "Destino Final",
      headerClassName: "header-grid",
      width: 746,
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Manejo de residuos
      </Typography>
      <Datatable
        columns={columns}
        rows={datos}
        getRowId={(row) => row.desecho}
      />
    </Box>
  );
};

export default DecimaSeccion;
