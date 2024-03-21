"use client";

import Avatars from "@/components/admin/avatar/Avatar";
import WorkersForm from "@/components/forms/workersForm";
import MessageGlobal from "@/components/message/MessageGlobal";
import { Workers } from "@/types/inspectors";
import { deleteWorkers, getWorkers } from "@/utils/workers";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import UserCard from "@/components/admin/workers/UserCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import BotonFlotante from "@/components/BotonFlotante";

const Inspectors = () => {
  const theme = useTheme();
  const [workers, setWorkers] = useState<Workers[]>([]);

  //Para el mensaje de guardado.
  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [isDelete, setIsDelete] = React.useState(false);
  const [edit, setEdit] = useState(false);
  const [id, setID] = useState(0);
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const [isAgregate, setIsAgregate] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";

  const dispatch = useDispatch();
  const workerState = useSelector((state: RootState) => state.worker);

  const [validadorDelete, setValidadorDelete] = useState(false);

  const [validadorEdit, setValidadorEdit] = useState(false);

  useEffect(() => {
    setValidadorDelete(workerState.isDelete);
    setValidadorEdit(workerState.isEdit);
  }, [workerState.isDelete, workerState.isEdit]);

  const handleSave = () => {
    if (validadorEdit) {
      setMessage("El dato se edito!");
    }
    if (validadorDelete) {
      setMessage("El dato se elimino!");
    } else {
      setMessage("El dato se creo!");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 3000);
    getAllWorkers();
  };

  useEffect(() => {
    getAllWorkers();
  }, []);

  const getAllWorkers = async () => {
    try {
      const response = await getWorkers();
      if (response.data !== undefined) {
        setWorkers(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInspectores = async (id: number) => {
    try {
      const response = await deleteWorkers(id);
      getAllWorkers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditarClick = (
    id: number,
    nombre: string,
    apellido: string,
    numeroTelefono: string
  ) => {
    setEdit(true);
    setID(id);
    setNombre(nombre);
    setApellido(apellido);
    setNumeroTelefono(numeroTelefono);
  };

  const handleEliminarClick = (id: number) => {
    setIsDelete(true);
    setID(id);
    deleteInspectores(id);
    handleSave();
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "1rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.secondary.light,
          }}
        >
          Trabajadores
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
      {(isAgregate || edit) && (
        <Box
          sx={{
            marginTop: "1rem",
          }}
        >
          <WorkersForm
            isEdit={edit}
            numeroTelefono={numeroTelefono}
            apellidoInspector={apellido}
            idInspector={id}
            nombreInspector={nombre}
            onClick={handleSave}
          />
        </Box>
      )}
      <MessageGlobal
        show={showMessage}
        message={message}
        type={edit ? "info" : isDelete ? "error" : "success"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "1rem",
    
          marginBottom: "1rem",
        }}
      >
        <UserCard
          firstName="May"
          lastName="Gutierrez"
          fullName="May Ivar Gutierrez"
          phoneNumber="763553553"
        />
        {workers.map((item) => (
          <UserCard
            id={item.id}
            firstName={item.nombre}
            lastName={item.apellido}
            phoneNumber={item.numeroTelefono}
            avatarUrl={item.urlImg}
            onClick={()=>handleSave()}
          />
        ))}
      </Box>
     <BotonFlotante/> 
    </Box>
  );
};

export default Inspectors;
