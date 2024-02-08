import { Box, TextField, Tooltip } from '@mui/material'
import React from 'react'
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { DatosSchema } from '@/validations/datoSchema';
import { datoInterface } from '@/types/dato';
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";

const DatosForm = () => {
    const resolver: Resolver<datoInterface, FieldErrors<datoInterface>> = async (data) => {
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
  return (
    <form  className="borde-card" action="">
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
          id="nombre"
          label="Nombre de Dato"
          variant="outlined"
          
          {...register("titulo")}
          error={!!errors.titulo}
          helperText={errors?.titulo?.message}
          /*defaultValue={isEdit ? nombreSection || "" : ""}*/
          /*InputLabelProps={{ shrink: !!nombreSection || undefined }}*/
        />
        <TextField
          sx={{ flex: 1 }}
          id="descripcion"
          label="Escribe una descripcion"
          multiline
          
          {...register("descripcion")}
          error={!!errors.descripcion}
          helperText={errors?.descripcion?.message}
          /*defaultValue={isEdit ? descripcionSection || "" : ""}
          InputLabelProps={{ shrink: !!descripcionSection || undefined }}*/
        />
        <Tooltip title={/*title*/''}>
          <button /*onClick={onClick}*/ className="btn-save" type="submit">
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
      </Box>
    </form>
  )
}

export default DatosForm