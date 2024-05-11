import {
  Box,
  Checkbox,
  FormControlLabel,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Datatable from "../../datatable/Datatable";
import { ReadOnlyTextField } from "../ReadOnlyInput";
import { getDatosSection } from "@/services/datoSection";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

interface PropsTable {
  frecuenciaCorte: string;
  herramientasUsadas: string;
  materialEnvase: string;
  precio: string;
}

const OctavaSeccion = () => {
  const theme = useTheme();
  const [dataRows, setDataRows] = useState<PropsTable[]>([]);
  const [dataColums, setDataColums] = useState<any[]>([]);
  const infoDatosState = useSelector((state: RootState) => state.infoDatos);
  const tokenState = useSelector((state: RootState) => state.auth);

  const [valorTextF1, setValorTextF1] = useState("");
  const [valorTextF2, setValorTextF2] = useState("");
  const [valorTextF3, setValorTextF3] = useState("");

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
      const data = await allGetData(6);

      // Encontrar el elemento en infoDatosState.data con IDDato igual a 54
      const elemento = infoDatosState.data.find(
        (item: any) => item.IDDato === 54
      );
      const elemento1 = infoDatosState.data.find(
        (item: any) => item.IDDato === 55
      );
      const elemento2 = infoDatosState.data.find(
        (item: any) => item.IDDato === 56
      );

      if (elemento && elemento1 && elemento2) {
        setValorTextF1(elemento.informacion);
        setValorTextF2(elemento1.informacion);
        setValorTextF3(elemento2.informacion);
      }

      setDataColums(data);
      const Datos = infoDatosState.data
        .map((obj: any) => {
          const primerC = infoDatosState.data.find(
            (info: any) => Number(info.IDDato) === Number(dataColums[0]?.id)
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
          if (!primerC && !segundaC && !terceraC && !cuartaC) return null;
          return {
            frecuenciaCorte: primerC?.informacion,
            herramientasUsadas: segundaC?.informacion,
            materialEnvase: terceraC?.informacion,
            precio: cuartaC?.informacion,
          };
        })
        .filter(Boolean) as PropsTable[];
      setDataRows(Datos);
    };
    fetchData();
  }, [dataColums, dataRows, infoDatosState]);

  const columns = [
    {
      field: "frecuenciaCorte",
      headerName: dataColums[0]?.titulo,
      headerClassName: "header-grid",
      width: 250,
    },
    {
      field: "herramientasUsadas",
      headerName: dataColums[1]?.titulo,
      headerClassName: "header-grid",
      width: 250,
    },
    {
      field: "materialEnvase",
      headerName: dataColums[2]?.titulo,
      headerClassName: "header-grid",
      width: 295,
    },
    {
      field: "precio",
      headerName: dataColums[3]?.titulo,
      headerClassName: "header-grid",
      width: 200,
    },
  ];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <Typography variant="h6" color={theme.palette.secondary.light}>
        Cosecha y pos cosecha del cacao{" "}
      </Typography>
      <Datatable
        columns={columns}
        rows={dataRows}
        getRowId={(row) => row.frecuenciaCorte || Math.random()}
      />
      <Box sx={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Box sx={{ width: "50rem" }}>
          <Typography color={theme.palette.secondary.contrastText}>
            Mano de obra
          </Typography>
          <FormControlLabel
            sx={{ color: theme.palette.secondary.contrastText }}
            control={<Checkbox checked={valorTextF1 === "Familiar"} readOnly />}
            label="Familiar"
          />
          <FormControlLabel
            checked={valorTextF1 === "Contratada"}
            control={<Checkbox />}
            label="Contratada"
          />
        </Box>
        <ReadOnlyTextField label="Precio" value={valorTextF2} />
        <ReadOnlyTextField label="Cantidad de dias" value={valorTextF3} />
      </Box>
    </Box>
  );
};

export default OctavaSeccion;
