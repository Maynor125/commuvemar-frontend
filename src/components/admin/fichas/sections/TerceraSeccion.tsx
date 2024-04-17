import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";


interface PropsTable{
  nombreParcela: string ;
  areaEnMz: string;
  cultivo: string ;
  insumosUtilizados: string;
}

const TerceraSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [dataColums, setDataColums] = useState<PropsTable[]>([]);
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

  useEffect(() => {
    //console.log('los datos de esta ficha de forma global',infoDatosState.data);
    const fetchData = async () => {
      const data = await allGetData(6);
      setDataRows(data);
      
      const Datos = infoDatosState.data.map((obj: any) => {
        const primerC = infoDatosState.data.find((info:any)=>
        Number(info.IDDato) === Number(dataRows[0]?.id))
        const segundaC = infoDatosState.data.find((info:any)=>
        Number(info.IDDato) === Number(dataRows[1]?.id))
        const terceraC = infoDatosState.data.find((info:any)=>
        Number(info.IDDato) === Number(dataRows[2]?.id))
        const cuartaC = infoDatosState.data.find((info:any)=>
        Number(info.IDDato) === Number(dataRows[3]?.id))
        if(!primerC && !segundaC && !terceraC && !cuartaC) return null 
        return {
          nombreParcela: primerC ? primerC.informacion : '',
          areaEnMz: segundaC ? segundaC.informacion :'',
          cultivo: terceraC ? terceraC.informacion : '',
          insumosUtilizados: cuartaC ? cuartaC.informacion : '',
        };
      }).filter(Boolean) as PropsTable[];
      setDataColums(Datos);
    };
    fetchData();
  }, [dataColums,infoDatosState]);

  const columns = [
    {
      field: "nombreParcela",
      headerName: dataRows[0]?.titulo,
      headerClassName: "header-grid",
      width: 250,
    },
    {
      field: "areaEnMz",
      headerName: dataRows[1]?.titulo,
      headerClassName: "header-grid",
      width: 250,
    },
    {
      field: "cultivo",
      headerName: dataRows[2]?.titulo,
      headerClassName: "header-grid",
      width: 250,
    },
    {
      field: "insumosUtilizados",
      headerName: dataRows[3]?.titulo,
      headerClassName: "header-grid",
      width: 245,
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Informacion de parcelas
      </Typography>
      <Datatable columns={columns} rows={dataColums} getRowId={(row) => row?.nombreParcela || Math.random()}/>
    </Box>
  );
};

export default TerceraSeccion;
