import { Box, TextField, Tooltip } from "@mui/material";
import React, { useState } from "react";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { InfoDatosSchema } from "@/validations/infoDatoSchema";
import { infoDatoInterface } from "@/types/informacionDato";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { createInfoDato } from "@/services/informacionDato";

interface GeneralActionProps {
  onClick: () => void;
  IDDato: number | null;
  IDFicha: number;
}

const InfoDatosForm: React.FC<GeneralActionProps> = ({
  onClick,
  IDDato,
  IDFicha,
}) => {
  const resolver: Resolver<
    infoDatoInterface,
    FieldErrors<infoDatoInterface>
  > = async (data) => {
    try {
      // Validar los datos con zod
      await InfoDatosSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<infoDatoInterface> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof infoDatoInterface;
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
  } = useForm<infoDatoInterface>({
    resolver: resolver,
  });

  const createInfoDatos = async (
    informacion: string,
    descripcion: string,
    IDDato: number,
    IDFicha: number
  ) => {
    try {
      const response = await createInfoDato(
        informacion,
        descripcion,
        IDDato,
        IDFicha
      );
      if (!response.error) {
        onClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: infoDatoInterface) => {
    if (IDDato !== null) {
      createInfoDatos(data.informacion, '', IDDato, IDFicha);
    }
  };

  return (
    <form style={{padding: "1rem",display: "flex", flexDirection:'column',
    gap: "1rem",}} className="borde-card" onSubmit={handleSubmit(onSubmit)}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",

          "@media (max-width: 1100px)": {
            flexDirection: "column",
            alignItems: "stretch",
          },
        }}
      >
        <TextField
          id="titulo"
          label="Ingresa el veredicto final"
          variant="outlined"
          multiline
          rows={4}
          disabled={!IDDato || IDDato < 1}
          {...register("informacion")}
          error={!!errors.informacion}
          helperText={errors?.informacion?.message}
          sx={{flex:1}}
        />
      </Box>
      <Tooltip title={/*title*/ "Guardar Dato"}>
      <span>
         <button disabled={!IDDato || IDDato < 1} style={{flex:1,width:'100%'}} onClick={onClick} className="btn-save" type="submit">
          Guardar
          <SaveRoundedIcon />
        </button>
      </span>
      </Tooltip>
    </form>
  );
};

export default InfoDatosForm;
