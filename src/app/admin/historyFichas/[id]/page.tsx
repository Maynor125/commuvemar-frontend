"use client";

import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import BannerFicha from "@/components/admin/fichas/BannerFicha";
import html2pdf from "html2pdf.js";
import PrimeraSeccion from "@/components/admin/fichas/sections/PrimeraSeccion";
import SegundaSeccion from "@/components/admin/fichas/sections/SegundaSeccion";
import TerceraSeccion from "@/components/admin/fichas/sections/TerceraSeccion";
import CuartaSeccion from "@/components/admin/fichas/sections/CuartaSeccion";
import QuintaSeccion from "@/components/admin/fichas/sections/QuintaSeccion";
import SextaSeccion from "@/components/admin/fichas/sections/SextaSeccion";
import SeptimaSeccion from "@/components/admin/fichas/sections/SeptimaSeccion";
import OctavaSeccion from "@/components/admin/fichas/sections/OctavaSeccion";
import NovenaSeccion from "@/components/admin/fichas/sections/NovenaSeccion";
import BotonFlotante from "@/components/BotonFlotante";
import DecimaSeccion from "@/components/admin/fichas/sections/DecimaSeccion";
import UnDecimaSeccion from "@/components/admin/fichas/sections/UnDecimaSeccion";
import Declaracion from "@/components/admin/fichas/sections/Declaracion";
import DictamenFinal from "@/components/admin/fichas/sections/DictamenFinal";
import DecisionComite from "@/components/admin/fichas/sections/DecisionComite";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { getDatosSection } from "@/services/datoSection";
import { infoDatoInterface } from "@/types/informacionDato";
import { getInfoDatoFicha } from "@/services/informacionDato";
import { getFichasID } from "@/services/fichas";
import { Ficha } from "@/types/ficha";
import { setInfoDato } from "@/redux/features/infoDatoSlice";

interface PropsTable{ descripcion: string; realizacion: string; cantidad_observacion: string }

const Ficha = ({ params }: any) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const downloadPDF = useCallback(() => {
    const opt = {
      margin: 1,
      filename: `Ficha de inspeccion interna (${params.id}).pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    if (containerRef.current) {
      html2pdf().set(opt).from(containerRef.current).save();
    }
  }, []);

  //Verificar el estado de la ficha.
  const [isFichaActive,setIsFichaActive] = useState(false);
  const [infoFicha,setInfoFicha] = useState<Ficha[]>([])
  const dispatch = useDispatch();

  const getFicha= async () => {
    try {
      const response = await getFichasID(params.id);
      //console.log("Las Info de esta ficha",response.data);

       // Verificar si response.data es undefined
       if (response.data === undefined) {
        return []; // Devolver un array vacío si no hay datos
      } else {
        setInfoFicha(response.data);
        return response.data;
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }
  useEffect(() => {
    getFicha();
    if (Array.isArray(infoFicha)) {
      infoFicha.map((obj: any) => (
        obj.analizada === true && setIsFichaActive(true)
      ));
    }
  }, [infoFicha]);

  const [infoDatos,setInfoDatos] = useState<infoDatoInterface[]>([]);
  useEffect(()=>{
    const getInfoDatosFicha = async () => {
      try {
        const response = await getInfoDatoFicha(params.id);
        console.log("Las respuesta de esta ficha",response.data);
  
         // Verificar si response.data es undefined
         if (response.data === undefined) {
          return []; // Devolver un array vacío si no hay datos
        } else {
          setInfoDatos(response.data);
          dispatch(setInfoDato(response.data))
          return response.data;
        }
      } catch (error) {
        console.error(error);
        return [];
      }
    }
    getInfoDatosFicha();
    console.log("Los datos de esta ficha son",infoDatos)
  },[]);


  //-----------------------------------------------------------------
  const theme = useTheme();
  const fichasState = useSelector((state: RootState) => state.fichas);
  
  //Extaer los datos para la primera tabla.
  const [datosTabla1, setDatosTabla1] = useState<
    PropsTable[]
  >([]);

  const getDataSection = async (id: number) => {
    try {
      const response = await getDatosSection(id);

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

   //Extaer los datos para la septima tabla.
   const [datosTabla7, setDatosTabla7] = useState<
   PropsTable[]
 >([]);
   //Extaer los datos para la duodecima tabla.
   const [datosTabla12, setDatosTabla12] = useState<
   PropsTable[]
 >([]);


  useEffect(() => {
    let infoDatosLoaded = false;
    
    const fetchData = async () => {
      if (!infoDatosLoaded) return;

      const data = await getDataSection(5);
      const datosSection1 = data.map((obj: any) => {
        // Buscar el objeto correspondiente en infoDatos basado en el campo IDDato
      const infoDato = infoDatos.find((info: any) => Number(info.IDDato) === Number(obj.id))
      return{
        descripcion: obj.titulo,
        realizacion: infoDato ? infoDato.informacion : "",
        cantidad_observacion: infoDato ? infoDato.descripcion : "",
      }
      });
      setDatosTabla1(datosSection1);
    };
     // Establecer infoDatosLoaded en true una vez que infoDatos tenga datos
   if (infoDatos.length > 0) {
    infoDatosLoaded = true;
  }

  // Ejecutar fetchData si infoDatos ha sido cargado
  if (infoDatosLoaded) {
    fetchData();
    //console.log("datos de la primera seccion", datosTabla1)
  }
  }, [datosTabla1,getDataSection,infoDatos]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataSection(11);
      const datosSection7 = data.map((obj: any) => {
        // Buscar el objeto correspondiente en infoDatos basado en el campo IDDato
      const infoDato = infoDatos.find((info: any) => Number(info.IDDato) === Number(obj.id))
        return{
          descripcion: obj.titulo,
        realizacion: infoDato ? infoDato.informacion : "",
        cantidad_observacion: infoDato ? infoDato.descripcion : "",
        }
      });
      setDatosTabla7(datosSection7);
    };
    fetchData();
  }, [datosTabla7,getDataSection]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDataSection(16);
      const datosSection12 = data.map((obj: any) => {
         // Buscar el objeto correspondiente en infoDatos basado en el campo IDDato
      const infoDato = infoDatos.find((info: any) => Number(info.IDDato) === Number(obj.id))
      return {
                descripcion: obj.titulo,
        realizacion: infoDato ? infoDato.informacion : "",
        cantidad_observacion: infoDato ? infoDato.descripcion : "",
      }
      });
      setDatosTabla12(datosSection12);
    };
    fetchData();
  }, [datosTabla12,getDataSection]);

  

  //Funcion para analizar la ficha.
  const AnalizarFicha = ()=>{
    getFicha();
  }

  return (
    <Box>
      <BannerFicha />
      <Box
        sx={{
          marginY: "2rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextField
          variant="standard"
          placeholder="Buscar por seccion"
          InputProps={{
            disableUnderline: true, // Deshabilita el borde inferior
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <Box sx={{ display: "flex", gap: "1rem" }}>
          <Button
          onClick={AnalizarFicha}
          disabled={fichasState.AlanizadaFichas && fichasState.analizada}
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#4FBD55",
              "&:hover": {
                backgroundColor: "#57C168", // Cambia el color de fondo al pasar el cursor
              },
            }}
            variant="contained"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              color= {fichasState.AlanizadaFichas && fichasState.analizada ? "#B1A3BB" : "#ffffff"}
              fill="none"
              style={{ marginRight: "5px" }}
            >
              <path
                d="M21.25 5.5C20.8358 5.5 20.5 5.16421 20.5 4.75C20.5 4.33579 20.8358 4 21.25 4C21.6642 4 22 4.33579 22 4.75C22 5.16421 21.6642 5.5 21.25 5.5ZM21.25 5.5V9.25C21.25 9.94778 21.25 10.2967 21.1639 10.5806C20.97 11.2198 20.4698 11.72 19.8306 11.9139C19.5467 12 19.1978 12 18.5 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M2.75 18.5C3.16421 18.5 3.5 18.8358 3.5 19.25C3.5 19.6642 3.16421 20 2.75 20C2.33579 20 2 19.6642 2 19.25C2 18.8358 2.33579 18.5 2.75 18.5ZM2.75 18.5L2.75 14.75C2.75 14.0522 2.75 13.7033 2.83612 13.4194C3.03002 12.7802 3.53023 12.28 4.16943 12.0861C4.45333 12 4.80222 12 5.5 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M5.5 2.75C5.5 3.16421 5.16421 3.5 4.75 3.5C4.33579 3.5 4 3.16421 4 2.75C4 2.33579 4.33579 2 4.75 2C5.16421 2 5.5 2.33579 5.5 2.75ZM5.5 2.75L9.25 2.75C9.94778 2.75 10.2967 2.75 10.5806 2.83612C11.2198 3.03002 11.72 3.53023 11.9139 4.16943C12 4.45333 12 4.80222 12 5.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M18.5 21.25C18.5 20.8358 18.8358 20.5 19.25 20.5C19.6642 20.5 20 20.8358 20 21.25C20 21.6642 19.6642 22 19.25 22C18.8358 22 18.5 21.6642 18.5 21.25ZM18.5 21.25L14.75 21.25C14.0522 21.25 13.7033 21.25 13.4194 21.1639C12.7802 20.97 12.28 20.4698 12.0861 19.8306C12 19.5467 12 19.1978 12 18.5"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M5.54883 11.9512C5.54883 8.88704 5.54883 7.35498 6.50073 6.40307C7.45263 5.45117 8.9847 5.45117 12.0488 5.45117C15.113 5.45117 16.645 5.45117 17.5969 6.40307C18.5488 7.35498 18.5488 8.88704 18.5488 11.9512C18.5488 15.0153 18.5488 16.5474 17.5969 17.4993C16.645 18.4512 15.113 18.4512 12.0488 18.4512C8.9847 18.4512 7.45263 18.4512 6.50073 17.4993C5.54883 16.5474 5.54883 15.0153 5.54883 11.9512Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linejoin="round"
              />
              <path
                d="M12.499 14.5L11.0384 9.97891C10.9465 9.69466 10.6648 9.5 10.3452 9.5C10.0256 9.5 9.74382 9.69466 9.65199 9.97891L8.19133 14.5M14.9989 9.5V14.5M8.72979 13H11.9606"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Analizar
          </Button>
          <Button
            sx={{ textTransform: "none", color: "#fff" }}
            color="primary"
            variant="contained"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              color="#ffffff"
              fill="none"
              style={{ marginRight: "5px" }}
            >
              <path
                d="M11 2C6.58172 2 3 5.54539 3 9.91886C3 11.4118 3.41735 12.8082 4.14286 14"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M17 5H15C14.0572 5 13.5858 5 13.2929 5.29289C13 5.58579 13 6.05719 13 7V9C13 9.94281 13 10.4142 13.2929 10.7071C13.5858 11 14.0572 11 15 11H17C17.9428 11 18.4142 11 18.7071 10.7071C19 10.4142 19 9.94281 19 9V7C19 6.05719 19 5.58579 18.7071 5.29289C18.4142 5 17.9428 5 17 5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5 11V13M17.5 11V13M14.5 3V5M17.5 3V5M13 6.5H11M13 9.5H11M21 6.5H19M21 9.5H19"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M6.38287 17.0982C6.291 16.8216 6.24507 16.6833 6.25042 16.5713C6.26174 16.3343 6.41114 16.1262 6.63157 16.0405C6.73579 16 6.88105 16 7.17157 16H14.8284C15.119 16 15.2642 16 15.3684 16.0405C15.5889 16.1262 15.7383 16.3343 15.7496 16.5713C15.7549 16.6833 15.709 16.8216 15.6171 17.0982C15.4473 17.6094 15.3624 17.8651 15.2315 18.072C14.9572 18.5056 14.5272 18.8167 14.0306 18.9408C13.7935 19 13.525 19 12.9881 19H9.01186C8.47495 19 8.2065 19 7.96944 18.9408C7.47283 18.8167 7.04281 18.5056 6.7685 18.072C6.63755 17.8651 6.55266 17.6094 6.38287 17.0982Z"
                stroke="currentColor"
                stroke-width="1.5"
              />
              <path
                d="M14 19L13.8707 19.6466C13.7293 20.3537 13.6586 20.7072 13.5001 20.9866C13.2552 21.4185 12.8582 21.7439 12.3866 21.8994C12.0816 22 11.7211 22 11 22C10.2789 22 9.91842 22 9.61338 21.8994C9.14175 21.7439 8.74484 21.4185 8.49987 20.9866C8.34144 20.7072 8.27073 20.3537 8.12932 19.6466L8 19"
                stroke="currentColor"
                stroke-width="1.5"
              />
            </svg>
            Otra opcion
          </Button>
          <Button
            onClick={downloadPDF}
            sx={{
              textTransform: "none",
              color: "#fff",
              backgroundColor: "#D43333",
              "&:hover": {
                backgroundColor: "#a62a2a", // Cambia el color de fondo al pasar el cursor
              },
            }}
            variant="contained"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              color="#ffffff"
              fill="none"
              style={{ marginRight: "5px" }}
            >
              <path
                d="M7 18V15.5M7 15.5V14C7 13.5286 7 13.2929 7.15377 13.1464C7.30754 13 7.55503 13 8.05 13H8.75C9.47487 13 10.0625 13.5596 10.0625 14.25C10.0625 14.9404 9.47487 15.5 8.75 15.5H7ZM21 13H19.6875C18.8625 13 18.4501 13 18.1938 13.2441C17.9375 13.4882 17.9375 13.881 17.9375 14.6667V15.5M17.9375 18V15.5M17.9375 15.5H20.125M15.75 15.5C15.75 16.8807 14.5747 18 13.125 18C12.7979 18 12.6343 18 12.5125 17.933C12.2208 17.7726 12.25 17.448 12.25 17.1667V13.8333C12.25 13.552 12.2208 13.2274 12.5125 13.067C12.6343 13 12.7979 13 13.125 13C14.5747 13 15.75 14.1193 15.75 15.5Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M15 22H10.7273C7.46607 22 5.83546 22 4.70307 21.2022C4.37862 20.9736 4.09058 20.7025 3.8477 20.3971C3 19.3313 3 17.7966 3 14.7273V12.1818C3 9.21865 3 7.73706 3.46894 6.55375C4.22281 4.65142 5.81714 3.15088 7.83836 2.44135C9.09563 2 10.6698 2 13.8182 2C15.6173 2 16.5168 2 17.2352 2.2522C18.3902 2.65765 19.3012 3.5151 19.732 4.60214C20 5.27832 20 6.12494 20 7.81818V10"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3 12C3 10.1591 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Descargar en PDF
          </Button>
        </Box>
      </Box>
      <Box
        ref={containerRef}
        sx={{
          background: theme.palette.background.paper,
          minHeight: "90vh",
          borderRadius: "8px",
          marginBottom: "1.5rem",
          padding: "1.5rem",
          transition: "all .4s",
        }}
      >
        <Box sx={{ marginTop: "2rem", textAlign: "center" }}>
          <Typography variant="h6" color={theme.palette.secondary.light}>
            Ficha de inspeccion interna - Cacao organico
          </Typography>
        </Box>
        <Box
          sx={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
        >
          <PrimeraSeccion />
          <SegundaSeccion
            traeCantidad={true}
            titulo="Registros Administrativos"
            datos={datosTabla1}
          />
          <TerceraSeccion />
          <CuartaSeccion />
          <QuintaSeccion />
          <SextaSeccion />
          <SeptimaSeccion />
          <SegundaSeccion
            traeCantidad={true}
            titulo="Riesgos de Contaminación en la Finca"
            datos={datosTabla7}
          />
          <OctavaSeccion />
          <NovenaSeccion />
          <DecimaSeccion />
          <UnDecimaSeccion />
          <SegundaSeccion traeCantidad={false} titulo="Capacitacion" datos={datosTabla12}/>
          <Declaracion />
          <DictamenFinal />
          <DecisionComite />
        </Box>
      </Box>
      <BotonFlotante />
    </Box>
  );
};

export default Ficha;
