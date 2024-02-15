"use client";

import ProductorCard from "@/components/admin/productors/ProductorCard";
import ProductorsForm from "@/components/forms/ProductorsForm";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { Productors } from "@/types/productors";
import { getProductors } from "@/utils/productors";
import MessageGlobal from "@/components/message/MessageGlobal";

const Productors = () => {
  const [productors, setProductors] = useState<Productors[]>([]);

  const theme = useTheme();
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numeroCedula, setNumeroCedula] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [fechaIngresoPrograma, setFechaIngresoPrograma] = useState<Date | null>(null);
  const [estado,setEstado] = useState<number>(0);
  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";

  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isDelete, setIsDelete] = React.useState(false);

  const handleSave = () => {
    // Perform save action
    if (edit) {
      setMessage("El productor se edito!");
    }
    if (isDelete) {
      setMessage("El productor se elimino!");
    } else {
      setMessage("el Productor se creo!");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
    getAllProductors();
  };

  useEffect(()=>{
    getAllProductors();
  },[]);

  const getAllProductors = async () => {
    try {
      const response = await getProductors();
      console.log(response.data);
      if (response.data !== undefined) {
        setProductors(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProductors = async (id: number) => {
    try {
      const response = await deleteProductors(id);
      getAllProductors();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box component="main">
      <Box
        sx={{
          paddingY: "1.5rem",
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
            Productores
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
          <ProductorsForm 
          idProductor={id}
          nombre={nombre}
          apellido={apellido}
          numeroCedula={numeroCedula}
          numeroTelefono={numeroCedula}
          fechaIngresoPrograma={fechaIngresoPrograma}
          estado={estado}
          isEdit={edit}
          onClick={handleSave}
          />
        </Box>
        <MessageGlobal 
        show={showMessage}
        message={message}
        type={edit ? "info" : isDelete ? "error" : "success"}/>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap:"1rem"
          }}
        >
          <ProductorCard />
          {productors.map((item) => (
            <ProductorCard 
            nombre={item.nombre}
            apellido={item.apellido}
            numeroCedula={item.numeroCedula}
            numeroTelefono={item.numeroTelefono}
            fechaEntradaPrograma={item.fechaIngresoPrograma}
            estado={item.estado} 
            id={item.id}/>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Productors;
