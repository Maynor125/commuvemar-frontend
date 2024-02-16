"use client";

import FincasCard from "@/components/admin/fincas/FincasCard";
import FincaForm from "@/components/forms/FincaForm";
import { Fincas} from "@/types/fincas";
import { getFincas } from "@/utils/finca";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const Fincas = () => {
  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  const [isAgregate, setIsAgregate] = useState(false);
  const [nombre, setNombre] = useState("");
  const [comunidad, setComunidad] = useState("");
  const [areaCacaoProduccion, setAreaCacaoProduccion] = useState("");
  const [areaCacaoDesarrollo, setAreaCacaoDesarrollo] = useState("");
  const [produccionUltimoSiclo, setProduccionUltimoSiclo] = useState("");
  const [idProductor,setIdProductor] = useState();
  const [id, setID] = useState();
  const texto = isAgregate ? "Cancelar" : "Agregar";

  const [fincas,setFincas]=useState<Fincas[]>([]);

  useEffect(() => {
    getAllFincas();
  }, []);

  const getAllFincas = async ()=>{
    try {
      const response = await getFincas();
      console.log(response);
      if(response.data !== undefined)
      {
        setFincas(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

    //Para el mensaje de guardado.
    const [showMessage, setShowMessage] = React.useState(false);
    const [message, setMessage] = React.useState("");

  const [isDelete, setIsDelete] = React.useState(false);
  
  const handleSave = () => {
    if (edit) {
      setMessage("El dato se edito!");
    }
    if (isDelete) {
      setMessage("El dato se elimino!");
    } else {
      setMessage("El dato se creo!");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    getAllFincas();
    //setTimeout(() => setShowMessage(false), 3000);
  };

  return (
    <Box component="main">
      <Box
        sx={{
          paddingY: "2rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: theme.palette.secondary.light,
            }}
            variant="h5"
          >
            Fincas
          </Typography>
          <Button
            sx={{
              color: "#fff",
              backgroundColor: !isAgregate ? "#00A2DC" : "#D43333",
              "&:hover": {
                backgroundColor: !isAgregate ? "#0077b3" : "#a62a2a", // Cambia el color de fondo al pasar el cursor
              },
            }}
            variant="contained"
            onClick={() => setIsAgregate(!isAgregate)}
          >
            {texto}
          </Button>
        </Box>
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <FincaForm />
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap:'.5rem',
          marginTop: "1rem",
        }}>
          <FincasCard/>
          {
            fincas.map((item)=>(
              <FincasCard 
              productor={item.productor}
              areaCacaoDesarrollo={item.areaCacaoDesarrollo}
              areaCacaoProduccion={item.areaCacaoProduccion}
              comunidad={item.comunidad}
              nombre={item.nombre}
              produccionUltimoSiclo={item.produccionUltimoSiclo}
              idFinca={item.id}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Fincas;
