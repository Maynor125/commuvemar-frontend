"use client";

import UserCard from "@/components/admin/user/UserCard";
import UserForm from "@/components/forms/UserForm";
import MessageGlobal from "@/components/message/MessageGlobal";
import { RootState } from "@/redux/store/store";
import { User } from "@/types/user";
import { getAllUsers } from "@/services/userW";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const page = () => {
  const theme = useTheme();
  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";
  const userState = useSelector((state: RootState) => state.user);

  const [users,setUsers] = useState<User[]>([]);

  //Para el mensaje de guardado.
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const getAllUser = async ()=>{
    try {
      const response = await getAllUsers();
      console.log(response);
      if(response.data !== undefined)
      {
        setUsers(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getAllUser();
  })

  const handleSave = () => {
    if (userState.isEdit) {
      setMessage("La finca se edito!");
    }
    if (userState.isDelete) {
      setMessage("La finca se elimino!");
    } else {
      setMessage("La finca se creo!");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    getAllUser();
    //setTimeout(() => setShowMessage(false), 3000);
  };

  const [edit,setEdit] = useState(false);
  const [deleteU,setDeleteU] = useState(false);

  useEffect(()=>{
    if(userState.isDelete){
      setDeleteU(true);
    }
    else if(userState.isEdit){
      setEdit(true);
    }
  },[userState])

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
        type={edit ? "info" : deleteU ? "error" : "success"}
        action={edit ? "Edito" : deleteU ? "Elimino": "Creo"}/>
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
          onClick={handleSave}
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
