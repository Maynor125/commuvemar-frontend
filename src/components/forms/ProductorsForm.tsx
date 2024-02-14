import React, { useState } from "react";

import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import { Productors } from "@/types/productors";
import { ProductorsSchema } from "@/validations/productorsSchema";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { ZodError } from "zod";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { createProductors, updateProductors } from "@/utils/productors";
import LocalizationProviderWrapper from "../admin/dateProvider";

import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface GeneralActionProps {
  onClick: () => void;
  nombre: string;
  apellido: string;
  numeroCedula: string;
  numeroTelefono: string;
  fechaIngresoPrograma: Date | null;
  estado: string;
  isEdit: boolean;
  idProductor: number;
}

const ProductorsForm: React.FC<GeneralActionProps> = ({
  apellido,
  estado,
  fechaIngresoPrograma,
  idProductor,
  isEdit,
  nombre,
  numeroCedula,
  numeroTelefono,
  onClick,
}) => {
  const resolver: Resolver<Productors, FieldErrors<Productors>> = async (
    data
  ) => {
    try {
      // Validar los datos con zod
      await ProductorsSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<Productors> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof Productors;
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
  } = useForm<Productors>({
    resolver: resolver,
  });

  const onSubmit = (data: Productors) => {
    if (isEdit) {
      if (idProductor && idProductor !== -1) {
        updateProductor(
          data.id,
          data.nombre,
          data.apellido,
          data.numeroCedula,
          data.numeroTelefono,
          data.fechaIngresoPrograma,
          data.estado
        );
      }
    } else {
      createProductor(
        data.nombre,
        data.apellido,
        data.numeroCedula,
        data.numeroTelefono,
        data.fechaIngresoPrograma,
        data.estado
      );
    }
    // Limpiar los valores de los campos
    setValue("nombre", "");
    setValue("apellido", "");
    setValue("numeroCedula", "");
    setValue("numeroTelefono", "");
    setValue("fechaIngresoPrograma", null);
    setValue("estado", 0);
  };

  const createProductor = async (
    nombre: string,
    apellido: string,
    numeroCedula: string,
    numeroTelefono: string,
    fechaIngresoPrograma: Date,
    estado: number
  ) => {
    try {
      const response = await createProductors(
        nombre,
        apellido,
        numeroCedula,
        numeroTelefono,
        fechaIngresoPrograma,
        estado
      );
      if (response.data) {
        onClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateProductor = async (
    id: number,
    nombre: string,
    apellido: string,
    numeroCedula: string,
    numeroTelefono: string,
    fechaIngresoPrograma: Date,
    estado: number
  ) => {
    try {
      const response = await updateProductors(
        id,
        nombre,
        apellido,
        numeroCedula,
        numeroTelefono,
        fechaIngresoPrograma,
        estado
      );
      if (response.data) {
        onClick();
      }
    } catch (error) {
      console.error(error);
    }
  };

  //Logica para la fecha.
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [valueDate, setValueDate] = React.useState<Dayjs | null>(null);
  console.log(valueDate);

  return (
    <LocalizationProviderWrapper>
      <form className="borde-card" onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            padding: "1rem",
            width: "100%",
            display: "flex",
            gap: "1rem",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
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
              sx={{ flex: 2 }}
              id="nombre"
              label="Nombre de productor"
              variant="outlined"
              {...register("nombre")}
              error={!!errors.nombre}
              helperText={errors?.nombre?.message}
              defaultValue={isEdit ? nombre || "" : ""}
              InputLabelProps={{ shrink: !!nombre || undefined }}
            />
            <TextField
              sx={{ flex: 2 }}
              id="apellido"
              label="Apellido del productor"
              multiline
              {...register("apellido")}
              error={!!errors.apellido}
              helperText={errors?.apellido?.message}
              defaultValue={isEdit ? apellido || "" : ""}
              InputLabelProps={{ shrink: !!apellido || undefined }}
            />
          </Box>
          <Box
            sx={{
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
              sx={{ flex: 2 }}
              id="numeroCedula"
              label="Numero de cedula"
              variant="outlined"
              {...register("numeroCedula")}
              error={!!errors.numeroCedula}
              helperText={errors?.numeroCedula?.message}
              defaultValue={isEdit ? numeroCedula || "" : ""}
              InputLabelProps={{ shrink: !!numeroCedula || undefined }}
            />

            <TextField
              sx={{ flex: 2 }}
              id="numeroTelefono"
              label="Numero de telefono"
              multiline
              {...register("numeroTelefono")}
              error={!!errors.numeroTelefono}
              helperText={errors?.numeroTelefono?.message}
              defaultValue={isEdit ? numeroTelefono || "" : ""}
              InputLabelProps={{ shrink: !!numeroTelefono || undefined }}
            />
          </Box>
          <Box
            sx={{
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
            <DatePicker
             label="Fecha de ingreso al programa"
              sx={{ flex: 3 }}
              value={fechaIngresoPrograma}
              onChange={(date:any) => setValue("fechaIngresoPrograma", date)}
              TextFieldComponent={(props:any) => (
                <TextField {...props} variant="outlined" />
              )}
            />
            <TextField
              sx={{ flex: 2 }}
              id="estado"
              label="Estado"
              multiline
              {...register("estado")}
              error={!!errors.estado}
              helperText={errors?.estado?.message}
              defaultValue={isEdit ? estado || "" : ""}
              InputLabelProps={{ shrink: !!estado || undefined }}
            />
            <Tooltip title="Guardar">
              <button onClick={onClick} className="btn-save" type="submit">
                Guardar
                <SaveRoundedIcon />
              </button>
            </Tooltip>
          </Box>
        </Box>
      </form>
    </LocalizationProviderWrapper>
  );
};

export default ProductorsForm;
