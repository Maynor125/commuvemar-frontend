"use client";

import Avatars from "@/components/admin/avatar/Avatar";
import InspectorsForm from "@/components/forms/InspectorsForm";
import MessageGlobal from "@/components/message/MessageGlobal";
import { Inspectors } from "@/types/inspectors";
import { deleteInspertors, getInspectors } from "@/utils/inspectors";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import MoreVertIcon from "@mui/icons-material/MoreVert";

const Inspectors = () => {
  const theme = useTheme();
  const [productors, setProductors] = useState<Inspectors[]>([]);

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
  };

  useEffect(() => {
    getAllInspectors();
  }, []);

  const getAllInspectors = async () => {
    try {
      const response = await getInspectors();
      if (response.data !== undefined) {
        setProductors(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteInspectores = async (id: number) => {
    try {
      const response = await deleteInspertors(id);
      getAllInspectors();
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
          <InspectorsForm
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
          gap: "1.3rem",
          flexWrap: "wrap",
          marginTop: "1rem",
        }}
      >
        <div className="borde-card">
          <Box
            sx={{
              padding: ".5rem 2rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "500",
                  color: theme.palette.secondary.light,
                  fontSize: "1.1rem",
                }}
              >
                Anya Taylor
              </Typography>
            </Box>

            <Box sx={{ marginY: ".3rem" }}>
              <Avatars />
            </Box>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
            >
              Anya Adriana
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
            >
              Taylor Jarquin
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              + 505 3456-2345
            </Typography>
          </Box>
        </div>
        <div className="borde-card">
          <Box
            sx={{
              width: "11rem",
              height: "13rem",
              backgroundColor: theme.palette.background.paper,
              borderRadius: "4px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: "500",
                color: theme.palette.secondary.light,
                fontSize: "1.1rem",
              }}
            >
              Anya Taylor
            </Typography>
            <Box sx={{ marginY: ".3rem" }}>
              <Avatars />
            </Box>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
            >
              Anya Adriana
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
              }}
            >
              Taylor Jarquin
            </Typography>
            <Typography
              sx={{
                color: theme.palette.secondary.contrastText,
                fontSize: "13px",
                marginTop: "4px",
              }}
            >
              + 505 3456-2345
            </Typography>
            {/* <Box sx={{
              display: "flex",
            }}>
            <IconButton>
            <EditRoundedIcon
                sx={{
                  color: "#ffc",
                  backgroundColor: "#FFCD43",
                  width: "1.9rem",
                  height: "1.9rem",
                  padding: ".3rem",
                  borderRadius: "4px",
                }}
              />
            </IconButton>
            </Box> */}
          </Box>
        </div>
      </Box>
    </Box>
  );
};

export default Inspectors;
