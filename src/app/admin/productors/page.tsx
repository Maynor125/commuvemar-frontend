"use client";

import ProductorCard from "@/components/admin/productors/ProductorCard";
import ProductorsForm from "@/components/forms/ProductorsForm";
import ProtectedPage from "@/middleware/ProtectedPage";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import type { Productors } from "@/types/productors";
import { getProductors } from "@/services/productors";
import MessageGlobal from "@/components/message/MessageGlobal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { clearValueProductor } from "@/redux/features/productorsSlice";
import BotonFlotante from "@/components/BotonFlotante";

const Page = () => {
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


  const dispatch = useDispatch();
  const productorState = useSelector((state: RootState) => state.productor);
  const [validadorDelete,setValidadorDelete]=useState(false);
  const [validadorEdit,setValidadorEdit]=useState(false)
  
  useEffect(()=>{
      setValidadorDelete(productorState.isDelete);
      setValidadorEdit(productorState.isEdit);
  },[productorState.isDelete,productorState.isEdit]);

  const handleSave = () => {

    // Perform save action
    if (validadorEdit) {
      setMessage("El productor se edito!");
    }
    if (validadorDelete) {
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
      if (response.data !== undefined) {
        setProductors(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
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
        action=""
        show={showMessage}
        message={message}
        type={productorState.isEdit ? "info" : validadorDelete ? "error" : "success"}/>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap:"1rem"
          }}
        >
          {productors.map((item) => (
            <ProductorCard 
            nombre={item.nombre}
            apellido={item.apellido}
            numeroCedula={item.numeroCedula}
            numeroTelefono={item.numeroTelefono}
            fechaEntradaPrograma={item.fechaIngresoPrograma}
            estadoProgramaC={item.estadoProgramaC} 
            id={item.id}
            onClick={handleSave}/>
          ))}
        </Box>
      </Box>
      <BotonFlotante/>
    </Box>
  );
};

export default Page;
