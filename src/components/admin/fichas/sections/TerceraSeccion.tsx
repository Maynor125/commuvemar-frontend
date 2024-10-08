import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { datoInterface } from "@/types/dato";

interface PropsTable {
  nombreParcela: string;
  areaEnMz: string;
  cultivo: string;
  insumosUtilizados: string;
}

const TerceraSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<datoInterface[]>([]);
  const [dataColums, setDataColums] = useState<PropsTable[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const tokenState = useSelector((state: RootState) => state.auth);
  const fichaState = useSelector((state: RootState) => state.fichasA.fichaAnalizada);


  const allGetData = async (id: number) => {
    if (!tokenState.logueado) return;
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

  useEffect(() => {
    if (!tokenState.logueado) return;
    //console.log('los datos de esta ficha de forma global',infoDatosState.data);
    const fetchData = async () => {
      const data = await allGetData(6);
      if (data) setDataRows(data);

      const Datos = infoDatosState.data
        .map((obj: any) => {
          const primerC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataRows[0]?.id)
          );
          const segundaC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataRows[1]?.id)
          );
          const terceraC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataRows[2]?.id)
          );
          const cuartaC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataRows[3]?.id)
          );
          if (!primerC && !segundaC && !terceraC && !cuartaC) return null;
          return {
            nombreParcela: primerC ? primerC.informacion : "",
            areaEnMz: segundaC ? segundaC.informacion : "",
            cultivo: terceraC ? terceraC.informacion : "",
            insumosUtilizados: cuartaC ? cuartaC.informacion : "",
          };
        })
        .filter(Boolean) as PropsTable[];
      setDataColums(Datos);
    };
    fetchData();
  }, [dataColums, infoDatosState]);

  const columns = [
    {
      field: "nombreParcela",
      headerName: dataRows[0]?.titulo,
      headerClassName: fichaState ? "header-grid1" : "header-grid",
      width: 250,
    },
    {
      field: "areaEnMz",
      headerName: dataRows[1]?.titulo,
      headerClassName: fichaState? "header-grid1" : "header-grid",
      width: 250,
    },
    {
      field: "cultivo",
      headerName: dataRows[2]?.titulo,
      headerClassName: fichaState ? "header-grid1" : "header-grid",
      width: 250,
    },
    {
      field: "insumosUtilizados",
      headerName: dataRows[3]?.titulo,
      headerClassName: fichaState ? "header-grid1" : "header-grid",
      width: 250,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Informacion de parcelas
      </Typography>
      <Datatable
        columns={columns}
        rows={dataColums}
        getRowId={(row) => row?.nombreParcela || Math.random()}
      />
    </Box>
  );
};

export default TerceraSeccion;
