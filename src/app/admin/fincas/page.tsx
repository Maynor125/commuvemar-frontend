"use client";

import FincasCard from "@/components/admin/fincas/FincasCard";
import FincaForm from "@/components/forms/FincaForm";
import { Fincas} from "@/types/fincas";
import { deleteFincas, getFincas } from "@/utils/finca";
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
      setMessage("La finca se edito!");
    }
    if (isDelete) {
      setMessage("La finca se elimino!");
    } else {
      setMessage("La finca se creo!");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    getAllFincas();
    //setTimeout(() => setShowMessage(false), 3000);
  };

  const handleDelete = async (id:number) =>{
    setIsDelete(true);
    await deleteFincas(id);
    getAllFincas();
    handleSave();
  }

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
          <FincaForm 
          onClick={handleSave}
          idFinca={id}
          areaCacaoDesarrollo={areaCacaoDesarrollo}
          areaCacaoProduccion={areaCacaoProduccion}
          comunidad={comunidad}
          nombre={nombre}
          produccionUltimoSiclo={produccionUltimoSiclo}
          isEdit={edit}
          />
        </Box>
        <Box sx={{
          display: "flex",
          flexDirection: "column",
          gap:'.5rem',
          marginTop: "1rem",
        }}>
          <FincasCard 
          productor="Juan Perez"
          areaCacaoDesarrollo="20 mz"
          areaCacaoProduccion="10 mz"
          comunidad="El limon"
          nombre="La perrona"
          produccionUltimoSiclo="200 qq"
          IDProductor={2}
          idFinca={8}/>
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
              onDelete={handleDelete}
              />
            ))
          }
        </Box>
      </Box>
    </Box>
  );
};

export default Fincas;
