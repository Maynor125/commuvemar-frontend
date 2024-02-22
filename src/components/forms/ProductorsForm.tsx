"use client";

import React, { useEffect, useState } from "react";

import {
  Box,
  FormHelperText,
  IconButton,
  TextField,
  Tooltip,
} from "@mui/material";
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

import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

import { SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { error } from "console";
import { clearValueProductor } from "@/redux/features/productorsSlice";

interface GeneralActionProps {
  onClick: () => void;
  nombre: string;
  apellido: string;
  numeroCedula: string;
  numeroTelefono: string;
  fechaIngresoPrograma: Date | null;
  estado: number;
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
  const dispatch = useDispatch();
  const productorState = useSelector((state: RootState) => state.productor);
  const [fechaIngresoProgramaN, setFechaIngresoProgramaN] =
  useState<Date | null>(new Date());



  // const fechaActual = new Date();
  //   console.log('Fecha actual:', fechaActual);

  useEffect(() => {
    if (productorState.isEdit) {
      setDatePickerDisabled(true);
      setValueEstado(productorState.estado);
    } else {
      setDatePickerDisabled(false);
    }
    
    if(!fechaIngresoProgramaN)
    {
      setError(true);
    }
    else{
      setError(false);
    }
  }, [productorState,fechaIngresoProgramaN]);

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
    console.log("datos del formulario:", data);

    try {
      if (productorState.isEdit) {
        if (productorState.id && productorState.id !== -1) {
          updateProductor(
            productorState.id,
            data.nombre,
            data.apellido,
            data.numeroCedula,
            data.numeroTelefono,
            productorState.fechaIngresoPrograma,
            Number(valueEstado)
          );
        }
      } else {
        if (!fechaIngresoProgramaN) {
          setError(true);
        } else {
          createProductor(
            data.nombre,
            data.apellido,
            data.numeroCedula,
            data.numeroTelefono,
            fechaIngresoProgramaN,
            Number(valueEstado)
          );
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (fechaIngresoPrograma) {
      // Limpiar los valores de los campos
      setValue("nombre", "");
      setValue("apellido", "");
      setValue("numeroCedula", "");
      setValue("numeroTelefono", "");
      setValue("estado", 0);

      // esto limpiara los campos del estado global.
      dispatch(clearValueProductor());
    }
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
        Number(estado)
      );
      if (response) {
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
        Number(estado)
      );
      if (response) {
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
  const [valueEstado, setValueEstado] = useState(
    productorState.isEdit ? productorState.estado : ""
  );

  const handleChangeSelect = (event: SelectChangeEvent<string | number>) => {
    setValueEstado(event.target.value as string | number);
  };



  const handleFechaIngresoChange = (date: any) => {
    setFechaIngresoProgramaN(date);
    console.log("Fecha de ingreso al programa:", date);
  };
  const [error, setError] = useState(false);
  const [datePickerDisabled, setDatePickerDisabled] = useState(false);

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
              defaultValue={productorState.isEdit ? productorState.nombre : ""}
              InputLabelProps={{ shrink: !!productorState.nombre || undefined }}
            />
            <TextField
              sx={{ flex: 2 }}
              id="apellido"
              label="Apellido del productor"
              multiline
              {...register("apellido")}
              error={!!errors.apellido}
              helperText={errors?.apellido?.message}
              defaultValue={
                productorState.isEdit ? productorState.apellido : ""
              }
              InputLabelProps={{
                shrink: !!productorState.apellido || undefined,
              }}
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
              placeholder="610-230409-1008M"
              variant="outlined"
              {...register("numeroCedula")}
              error={!!errors.numeroCedula}
              helperText={errors?.numeroCedula?.message}
              defaultValue={
                productorState.isEdit ? productorState.numeroCedula : ""
              }
              InputLabelProps={{
                shrink: !!productorState.numeroCedula || undefined,
              }}
            />

            <TextField
              sx={{ flex: 2 }}
              id="numeroTelefono"
              label="Numero de telefono"
              multiline
              {...register("numeroTelefono")}
              error={!!errors.numeroTelefono}
              helperText={errors?.numeroTelefono?.message}
              defaultValue={
                productorState.isEdit ? productorState.numeroTelefono : ""
              }
              InputLabelProps={{
                shrink: !!productorState.numeroTelefono || undefined,
              }}
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
            <FormControl sx={{ flex: 3 }}>
              <DatePicker
                label="Fecha de ingreso al programa"
                value={fechaIngresoPrograma}
                onChange={handleFechaIngresoChange}
               
                disabled={datePickerDisabled}
              />
              {error && (
                <FormHelperText
                  sx={{
                    color: "red",
                  }}
                >
                  Por favor, selecciona una fecha de ingreso al programa.
                </FormHelperText>
              )}
            </FormControl>

            {/* 
              <TextField
              sx={{ flex: 3 }}
              id="fechaIngresoPrograma"
              label="Fecha de ingreso al programa"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              {...register("fechaIngresoPrograma", { required: true })}
            />*/}
            <FormControl sx={{ flex: 2 }}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                value={valueEstado}
                label="Estado"
                {...register("estado", { required: true })}
                error={!!errors.estado}
                onChange={handleChangeSelect}
              >
                <MenuItem value={"1"}>1</MenuItem>
                <MenuItem value={"2"}>2</MenuItem>
                <MenuItem value={"3"}>3</MenuItem>
              </Select>
              {errors?.estado && (
                <FormHelperText
                  sx={{
                    color: "red",
                  }}
                >
                  {errors.estado.message}
                </FormHelperText>
              )}
            </FormControl>
            <Tooltip title="Guardarr">
              <button className="btn-save" type="submit">
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
