"use client";

import UserCard from "@/components/admin/user/UserCard";
import UserForm from "@/components/forms/UserForm";
import MessageGlobal from "@/components/message/MessageGlobal";
import { RootState } from "@/redux/store/store";
import { User } from "@/types/user";
import { getAllUsers } from "@/utils/userW";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const theme = useTheme();

  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);
  const [validadorEdit,setValidadorEdit] = useState(false);
  const [validadorDelete,setValidadorDelete] = useState(false);

  const [users,setUsers] = useState<User[]>([]);

  useEffect(()=>{
    getAllUser();
  },[]);

  useEffect(()=>{
    if(userState.isEdit){
      setValidadorEdit(true);
    }
    else{
      setValidadorEdit(false);
    }

    if(userState.isDelete){
      setValidadorDelete(true);
    }
    else{
      setValidadorDelete(false);
    }
  },[userState.isEdit,userState.isDelete])

  const getAllUser = async ()=>{
    try {
      const response = await getAllUsers();
      console.log(response);
      if(response.data !== undefined){
        setUsers(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const handleSave =()=>{
    if(validadorEdit){
      setMessage("El usuario se edito");
    }
    if(validadorDelete){
      setMessage("El usuario se elimino");
    }
    if(!validadorDelete && !validadorEdit){
      setMessage("El usuario se creo");
    }
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
    getAllUser();
  }
  
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
            Usuarios
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
          <UserForm onClick={handleSave}/>
        </Box>
        <MessageGlobal 
        show={showMessage}
        message={message}
        type={userState.isEdit ? "info" : validadorDelete ? "error" : "success"}/>
        <Box
          sx={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "column",
            gap:"1rem"
          }}
        >
          <UserCard 
          id={20}
          email="maynoldemar@gmail.com"
          rol="Usuario"
          hash="5454677447"
          IDTrabajador={5}
          trabajador="Maynor"
           />
           {users.map((item)=>(
              <UserCard 
              id={item.id}
              email={item.email}
              rol={item.role}
              hash={item.hash}
              IDTrabajador={item.IDTrabajador}
              trabajador={item.trabajador}
              onClick={handleSave}
              />
           ))
           }
        </Box>
      </Box>
    </Box>
  );
};

export default page;
