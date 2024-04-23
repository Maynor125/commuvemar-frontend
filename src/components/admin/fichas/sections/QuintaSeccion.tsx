import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface Props {
  productoAplicado: string;
  origen: string;
  productoU: string;
  cantidadMz: string;
  vecesAño: string;
  cultivo: string;
  plagaEnfermedad: string;
}

const QuintaSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const tokenState = useSelector((state: RootState) => state.auth);

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

  const [datos, setDatos] = useState<Props[]>([]);

  //Mostrar todos los datos que pertenecen a la seccion en la que nos encontramos
  useEffect(() => {
    if (!tokenState.logueado) return;
    const fetchData = async () => {
      const data = await allGetData(8);
      setDataRows(data);
      const Datos = data.map((obj: any) => {
        const arrayData = infoDatosState.data.find(
          (info: any) => Number(info.IDDato) === Number(obj.id)
        );
        return {
          productoAplicado: obj.titulo,
          origen:
            Array.isArray(arrayData) && arrayData.length > 0
              ? arrayData[0].informacion
              : "",
          productoU:
            Array.isArray(arrayData) && arrayData.length > 1
              ? arrayData[1].informacion
              : "",
          cantidadMz:
            Array.isArray(arrayData) && arrayData.length > 2
              ? arrayData[2].informacion
              : "",
          vecesAño:
            Array.isArray(arrayData) && arrayData.length > 3
              ? arrayData[3].informacion
              : "",
          cultivo:
            Array.isArray(arrayData) && arrayData.length > 4
              ? arrayData[4].informacion
              : "",
          plagaEnfermedad:
            Array.isArray(arrayData) && arrayData.length > 5
              ? arrayData[5].informacion
              : "",
        };
      });
      setDatos(Datos);
    };
    fetchData();
  }, [dataRows]);

  const columns = [
    {
      field: "productoAplicado",
      headerName: "Producto Aplicado",
      headerClassName: "header-grid",
      width: 142,
    },
    {
      field: "origen",
      headerName: "Origen",
      headerClassName: "header-grid",
      width: 142,
    },
    {
      field: "productoU",
      headerName: "ProductoUtilizado",
      headerClassName: "header-grid",
      width: 142,
    },
    {
      field: "cantidadMz",
      headerName: "Cantidad/Mz (Dosis)",
      headerClassName: "header-grid",
      width: 142,
    },
    {
      field: "vecesAño",
      headerName: "Veces por año",
      headerClassName: "header-grid",
      width: 142,
    },
    {
      field: "cultivo",
      headerName: "En que cultivo se utilizo",
      headerClassName: "header-grid",
      width: 142,
    },
    {
      field: "plagaEnfermedad",
      headerName: "Para que plaga o enfermedad",
      headerClassName: "header-grid",
      width: 144,
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Control de plagas y enfermedades
      </Typography>
      <Datatable
        columns={columns}
        rows={datos}
        getRowId={(row) => row.productoAplicado}
      />
    </Box>
  );
};

export default QuintaSeccion;
