import { Box, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { DatosSchema } from "@/validations/datoSchema";
import { datoInterface } from "@/types/dato";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { createDato, updateDato } from "@/services/datoSection";

interface GeneralActionProps {
  onClick: () => void;
  isEdit: boolean;
  idDato?: number;
  tituloDato?: string;
  descripcionDato?: string;
  IDSeccionesFicha: number;
}

const DatosForm: React.FC<GeneralActionProps> = ({
  onClick,
  isEdit,
  descripcionDato,
  idDato,
  tituloDato,
  IDSeccionesFicha,
}) => {
  const resolver: Resolver<datoInterface, FieldErrors<datoInterface>> = async (
    data
  ) => {
    try {
      // Validar los datos con zod
      await DatosSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<datoInterface> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof datoInterface;
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
    setValue,
    formState: { errors },
  } = useForm<datoInterface>({
    resolver: resolver,
  });


  const onSubmit = (data: datoInterface) => {
    console.log("Formulario de secciones enviado:", data);

    if (isEdit) {
      if (idDato && idDato !== -1) {
        if (tituloDato) {
          if (descripcionDato) {
            updateDatos(idDato, data.titulo, data.descripcion);
            onClick();
          }
        }
      }
    } else {
      createDatos(data.titulo, data.descripcion);
      onClick();
    }
    // Limpiar los valores de los campos
    setValue("titulo", "");
    setValue("descripcion", "");
  };

  const createDatos = async (titulo: string, descripcion: string) => {
    try {
      const response = await createDato(titulo, descripcion, IDSeccionesFicha);
    } catch (error) {
      console.error(error);
    }
  };

  const updateDatos = async (
    id: number,
    titulo: string,
    descripcion: string
  ) => {
    try {
      const response = await updateDato(
        id,
        titulo,
        descripcion,
        IDSeccionesFicha
      );
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <form className="borde-card" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          padding: "1rem",
          width: "100%",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",

          "@media (max-width: 1100px)": {
            flexDirection: "column",
            alignItems: "stretch", // Alinear los elementos al principio y al final
          },
        }}
      >
        <TextField
          id="titulo"
          label="Titulo de Dato"
          variant="outlined"
          {...register("titulo")}
          error={!!errors.titulo}
          helperText={errors?.titulo?.message}
          defaultValue={isEdit ? tituloDato || "" : ""}
          InputLabelProps={{ shrink: !!tituloDato || undefined }}
        />
        <TextField
          sx={{ flex: 1 }}
          id="descripcion"
          label="Escribe una descripcion"
          multiline
          {...register("descripcion")}
          error={!!errors.descripcion}
          helperText={errors?.descripcion?.message}
          defaultValue={isEdit ? descripcionDato || "" : ""}
          InputLabelProps={{ shrink: !!descripcionDato || undefined }}
        />
        <Tooltip title={/*title*/ "Guardar Dato"}>
          <button onClick={onClick} className="btn-save" type="submit">
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  );
};

export default DatosForm;
