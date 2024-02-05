"use client";

import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import React from "react";
import { Section } from "@/types/section";
import { SectionsSchema } from "@/validations/sectionsSchema";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { useRef, useState } from "react";
import { ZodError } from "zod";
import { createSection, updateSection } from "@/utils/sections";

import TourRoundedIcon from "@mui/icons-material/TourRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

interface GeneralActionProps {
  onClick: () => void;
  title: string;
  isEdit: boolean;
  idSection?: number;
  nombreSection?: string;
  descripcionSection?: string;
}

const SectionsForm: React.FC<GeneralActionProps> = ({
  onClick,
  title,
  isEdit,
  idSection,
  nombreSection,
  descripcionSection,
}) => {
  const resolver: Resolver<Section, FieldErrors<Section>> = async (data) => {
    try {
      // Validar los datos con zod
      await SectionsSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<Section> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof Section;
          fieldErrors[fieldName] = {
            type: "validation", // Asegúrate de ajustar esto según tus necesidades
            message: issue.message ?? "Error de validación",
          };
        }
      });

      // Devolver los errores adaptados
      return { values: {}, errors: fieldErrors };
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Section>({
    resolver: resolver,
  });
  console.log("el id que me pasan es: ", idSection);
  console.log("el nombre que me pasan es: ", nombreSection);
  console.log("la  desc que me pasan es: ", descripcionSection);

  const onSubmit = (data: Section) => {
    console.log("Formulario de secciones enviado:", data);

    // Aquí ira la lógica del crud de secciones.
    if (isEdit) {
      if (idSection && idSection !== -1) {
        if (nombreSection /*&& nombreSection !== ""*/) {
          if (descripcionSection /*&& descripcionSection !== ""*/) {
            updateSections(idSection, data.nombre, data.descripcion);
          }
        }
      }
    } else {
      createSections(data.nombre, data.descripcion);
    }
    onClick();
  };

  const createSections = async (nombre: string, descripcion: string) => {
    try {
      const response = await createSection(nombre, descripcion);
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
    } catch (error) {
      console.error(error);
    }
  };

  const [edit, setEdit] = useState(true);
  const [is, setId] = useState("");

  return (
    <form className="borde-card" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          padding:'1rem',
          width: "100%",
          display: "flex",
          gap: "1rem",
          alignItems:'center',
          justifyContent:'space-between'
        }}
      >
        <TextField
          id="nombre"
          label="Nombre de seccion"
          variant="outlined"
          {...register("nombre")}
          error={!!errors.nombre}
          helperText={errors?.nombre?.message}
        />
        <TextField
          sx={{width:'1flex'}}
          id="descripcion"
          label="Escribe una descripcion"
          multiline
          {...register("descripcion")}
          error={!!errors.descripcion}
          helperText={errors?.descripcion?.message}
        />
        <Tooltip title={title}>
          <button onClick={onClick} className="btn-save" type="submit">
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  );
};

export default SectionsForm;
