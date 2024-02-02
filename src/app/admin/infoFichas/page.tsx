"use client";

import React, { useEffect, useState } from "react";
import {
  createSection,
  deleteSection,
  getSections,
  updateSection,
} from "@/utils/sections";
import {
  Box,
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

import BtnAction from "@/components/admin/section/btnAction";
import Link from "next/link";

const InformationFichas = () => {
  const [section, setSection] = useState<Section[]>([]);
  const theme = useTheme();

  useEffect(() => {
    getAllSection();
  }, []);

  const getAllSection = async () => {
    try {
      const response = await getSections();
      console.log(response.data);
      if (response.data !== undefined) {
        setSection(response.data);
      }
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const createSections = async (nombre: string, descripcion: string) => {
    try {
      const response = await createSection(nombre, descripcion);
      getAllSection();
    } catch (error) {
      console.error(error);
    }
  };

  const updateSections = async (
    id: number,
    nombre: string,
    descripcion: string
  ) => {
    try {
      const response = await updateSection(id, nombre, descripcion);
      getAllSection();
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

  const handleEditarClick = () => {
    // Lógica para editar
    console.log("Botón Editar clickeado");
  };

  const allData = getAllSection();
  return (
    <Box
      component="main"
      sx={{
        marginBottom: "1rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        {section.map((item) => (
          <Box
            sx={{
              width: "100%",
              padding: ".7rem",
            }}
            key={item.id}
            className="borde-card card"
          >
            <Typography
              variant="subtitle1"
              sx={{
                color: theme.palette.secondary.light,
                fontWeight: 500,
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
            {/* Aquí puedes agregar más detalles según tus necesidades */}
            <Box>
              <Link href="/admin">
                <BtnAction
                  tooltipTitle="Visitar"
                  icon={TourRoundedIcon}
                  onClick={handleEditarClick}
                />
              </Link>

              <BtnAction
                tooltipTitle="Editar"
                icon={EditRoundedIcon}
                onClick={handleEditarClick}
              />
              <BtnAction
                tooltipTitle="Eliminar"
                icon={DeleteRoundedIcon}
                onClick={handleEditarClick}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default InformationFichas;
