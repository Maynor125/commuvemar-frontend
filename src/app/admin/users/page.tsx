"use client";

import UserCard from "@/components/admin/user/UserCard";
import UserForm from "@/components/forms/UserForm";
import { User } from "@/types/user";
import { getAllUsers } from "@/utils/userW";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

const page = () => {
  const theme = useTheme();

  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";

  const [users,setUsers] = useState<User[]>([]);

  useEffect(()=>{
    getAllUser();
  },[]);

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

  const handleSave =()=>{
    console.log("holi")
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
          <UserForm />
        </Box>

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
