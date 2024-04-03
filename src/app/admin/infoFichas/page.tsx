"use client";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

import React, { useEffect, useState } from "react";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "@/services/sections";
import {
  Box,
  Button,
  Fade,
  IconButton,
  Tooltip,
  Typography,
  dialogClasses,
  useTheme,
} from "@mui/material";
import { Section } from "@/types/section";

import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import TourRoundedIcon from "@mui/icons-material/TourRounded";
import ForwardRoundedIcon from "@mui/icons-material/ForwardRounded";

import BtnAction from "@/components/admin/section/btnAction";
import Link from "next/link";
import SectionsForm from "@/components/forms/SectionsForm";
import NoData from "@/components/error/NoData";

import MessageGlobal from "@/components/message/MessageGlobal";
import BotonFlotante from "@/components/BotonFlotante";

const InformationFichas = () => {
  const [section, setSection] = useState<Section[]>([]);
  const theme = useTheme();

  const [showMessage, setShowMessage] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [isDelete, setIsDelete] = React.useState(false);

  const [edit, setEdit] = useState(false);
  const [id, setID] = useState();
  const [nombreSeccion, setNombreSeccion] = useState("");
  const [descSeccion, setDescSeccion] = useState("");
  const [isAgregate, setIsAgregate] = useState(false);
  const [hayDatos, setHayDatos] = useState(false);
  const texto = isAgregate ? "Cancelar" : "Agregar";

  const handleSave = () => {
    // Perform save action
    if (edit) {
      setMessage("la Seccion se edito!");
    }
    if (isDelete) {
      setMessage("la Seccion se elimino!");
    } else {
      setMessage("la Seccion se ");
    }

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 4000);
    getAllSection();
    setNombreSeccion('');
    setDescSeccion('');
  };

  useEffect(() => {
    getAllSection();
  }, []);

  const getAllSection = async () => {
    try {
      const response = await getSections();
      console.log(response.data);
      if (response.data !== undefined) {
        setSection(response.data);
        setHayDatos(true);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSections = async (id: number) => {
    try {
      const response = await deleteSection(id);
      getAllSection();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEliminarClick = (id: any) => {
    setIsDelete(true);
    setID(id);
    deleteSections(id);
    handleSave();
    setIsDelete(false);
  };

  const handleEditarClick = (id: any, nombre: string, descripcion: string) => {
    setEdit(true);
    setID(id);
    setNombreSeccion(nombre);
    setDescSeccion(descripcion);
    setEdit(false);
  };



  return (
    <Box
      component="main"
      sx={{
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginY: "2rem",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            
            color: theme.palette.secondary.light,
          }}
        >
          Secciones
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: ".5rem",
          }}
        >
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
      </Box>
      <Box>
        {(isAgregate || edit) && (
          <SectionsForm
            title="Guardar"
            onClick={handleSave}
            isEdit={edit}
            idSection={id}
            nombreSection={nombreSeccion}
            descripcionSection={descSeccion}
          />
        )}
      </Box>
      <MessageGlobal
        show={showMessage}
        message={message}
        type={edit ? "warning" : isDelete ? "error" : "success"}
        action={edit ? "Edito" : isDelete ? "Elimino": "Creo"}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
          marginTop: "1rem",
        }}
      >
        <Fade in={true} timeout={500}>
          <Box
            sx={{
              width: "100%",
              padding: ".7rem",
              display: "flex",
              justifyContent: "space-between",
            }}
            className="borde-card card"
          >
            <Box>
              <Typography
                variant="subtitle1"
                sx={{
                  color: theme.palette.secondary.light,
                  fontWeight: 600,
                }}
              >
                Seccion de prueba
              </Typography>
              <Typography
                sx={{
                  color: theme.palette.secondary.contrastText,
                }}
              >
                Esta es una targeta de prueba para poder darle los estilos
                correctos
              </Typography>
            </Box>
            {/* Aquí puedes agregar más detalles según tus necesidades */}
            <Box sx={{}}>
              <Link href="/admin">
                <BtnAction
                bgColor="#168CC8"
                  tooltipTitle="Visitar seccion"
                  icon={ForwardRoundedIcon}
                  onClick={handleEliminarClick}
                />
              </Link>

              <BtnAction bgColor="#FFCD43" tooltipTitle="Editar" icon={EditRoundedIcon} />
              <BtnAction bgColor="#D43333" tooltipTitle="Eliminar" icon={DeleteRoundedIcon} />
            </Box>
          </Box>
        </Fade>
        {hayDatos ? (
          section.map((item) => (
            <Fade in={true} key={item.id} timeout={500}>
              <Box
                sx={{
                  width: "100%",
                  padding: ".7rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
                key={item.id}
                className="borde-card card"
              >
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: theme.palette.secondary.light,
                      fontWeight: 600,
                    }}
                  >
                    {item.nombre}
                  </Typography>
                  <Typography
                    sx={{
                      color: theme.palette.secondary.contrastText,
                    }}
                  >
                    {item.descripcion}
                  </Typography>
                </Box>

                {/* Aquí puedes agregar más detalles según tus necesidades */}
                <Box>
                  <Link href={`/admin/infoFichas/${item.id}`}>
                    <BtnAction
                    bgColor="#168CC8"
                      tooltipTitle="Visitar"
                      icon={ForwardRoundedIcon}
                     
                    />
                  </Link>

                  <BtnAction
                  bgColor="#FFCD43"
                    tooltipTitle="Editar"
                    icon={EditRoundedIcon}
                    onClick={() =>
                      handleEditarClick(item.id, item.nombre, item.descripcion)
                    }
                  />
                  <BtnAction
                  bgColor="#D43333" 
                    tooltipTitle="Eliminar"
                    icon={DeleteRoundedIcon}
                    onClick={() => handleEliminarClick(item.id)}
                  />
                </Box>
              </Box>
            </Fade>
          ))
        ) : (
          <NoData />
        )}
      </Box>
      <BotonFlotante/>
    </Box>
  );
};

export default InformationFichas;
