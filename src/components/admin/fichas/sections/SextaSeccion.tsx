import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { ReadOnlyTextField } from "../ReadOnlyInput";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface PropsTable {
  nombreAbono: string;
  cantidadAplicada: string;
  origen: string;
  mesAplicado: string;
  cualCultivo: string;
}

const SextaSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<any[]>([]);
  const [dataColums, setDataColums] = useState<any[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const [valorTextF1, setValorTextF1] = useState("");
  const [valorTextF2, setValorTextF2] = useState("");
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

  useEffect(() => {
    if (!tokenState.logueado) return;
    const fetchData = async () => {
      const data = await allGetData(9);
      setDataColums(data);

      // Encontrar el elemento en infoDatosState.data con IDDato igual a 31
      const elemento = infoDatosState.data.find(
        (item: any) => item.IDDato === 31
      );

      if (elemento) {
        // Asignar las propiedades informacion y descripcion a los estados correspondientes
        setValorTextF1(elemento.informacion);
        setValorTextF2(elemento.descripcion);
      }

      const Datos = infoDatosState.data
        .map((obj: any) => {
          const primerC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataRows[0]?.id)
          );
          const segundaC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataColums[1]?.id)
          );
          const terceraC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataColums[2]?.id)
          );
          const cuartaC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataColums[3]?.id)
          );
          const quintaC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataColums[4]?.id)
          );
          if (!primerC && !segundaC && !terceraC && !cuartaC && !quintaC)
            return null;
          return {
            nombreAbono: primerC?.informacion,
            cantidadAplicada: segundaC?.informacion,
            origen: terceraC?.informacion,
            mesAplicado: cuartaC?.informacion,
            cualCultivo: quintaC?.informacion,
          };
        })
        .filter(Boolean) as PropsTable[];
      setDataRows(Datos);
    };
    fetchData();
  }, [dataRows, infoDatosState]);

  const columns = [
    {
      field: "nombreAbono",
      headerName: dataColums[0]?.titulo,
      headerClassName: "header-grid",
      width: 200,
    },
    {
      field: "cantidadAplicada",
      headerName: dataColums[1]?.titulo,
      headerClassName: "header-grid",
      width: 200,
    },
    {
      field: "origen",
      headerName: dataColums[2]?.titulo,
      headerClassName: "header-grid",
      width: 200,
    },
    {
      field: "mesAplicado",
      headerName: dataColums[3]?.titulo,
      headerClassName: "header-grid",
      width: 199,
    },
    {
      field: "cualCultivo",
      headerName: dataColums[4]?.titulo,
      headerClassName: "header-grid",
      width: 197,
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Aplicación de Fertilizantes Edáficos y Foliares
      </Typography>
      <Datatable
        columns={columns}
        rows={dataRows}
        getRowId={(row) => row.nombreAbono || Math.random()}
      />
      <Box sx={{ marginTop: "1rem" }}>
        <Typography color={theme.palette.secondary.light}>
          Tiene fertilizantes orgánicos almacenados Actualmente en la Finca
        </Typography>
        <Box sx={{ display: "flex", gap: "1rem", marginTop: ".3rem" }}>
          <ReadOnlyTextField label="Origen" value={valorTextF1} />
          <ReadOnlyTextField label="Cantidad" value={valorTextF2} />
        </Box>
      </Box>
    </Box>
  );
};

export default SextaSeccion;
