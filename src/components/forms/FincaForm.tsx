"use client";

import React, { useEffect, useState } from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { Fincas } from "@/types/fincas";
import { FincaSchema } from "@/validations/fincaSchema";
import { createFincas, updateFincas } from "@/utils/finca";
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Tooltip } from "@mui/material";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";

interface GeneralActionProps {
  onClick: () => void;
  nombre: string;
  comunidad: string;
  areaCacaoProduccion: string;
  areaCacaoDesarrollo: string;
  produccionUltimoSiclo: string;
  IDProductor: number;
  isEdit: boolean;
  idFinca?: number;
}

const FincaForm: React.FC<GeneralActionProps> = ({
  onClick,
  IDProductor,
  areaCacaoDesarrollo,
  areaCacaoProduccion,
  comunidad,
  isEdit,
  nombre,
  produccionUltimoSiclo,
  idFinca,
}) => {
  const resolver: Resolver<Fincas, FieldErrors<Fincas>> = async (data) => {
    try {
      // Validar los datos con zod
      await FincaSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<Fincas> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof Fincas;
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
  } = useForm<Fincas>({
    resolver: resolver,
  });

  const onSubmit = (data: Fincas) => {
    console.log("Formulario de fincas enviado:", data);

    // Aqui ira la logica del crud de fincas.
    if (isEdit) {
      if (idFinca && idFinca !== -1) {
        updateFinca(
          data.id,
          data.nombre,
          data.comunidad,
          data.areaCacaoProduccion,
          data.areaCacaoDesarrollo,
          data.produccionUltimoSiclo,
          data.IDProductor
        );
      }
    } else {
      createFinca(
        data.nombre,
        data.comunidad,
        data.areaCacaoProduccion,
        data.areaCacaoDesarrollo,
        data.produccionUltimoSiclo,
        data.IDProductor
      );
    }
    // Limpiar los valores de los campos
    setValue("nombre", "");
    setValue("comunidad", "");
    setValue("areaCacaoProduccion", "");
    setValue("areaCacaoDesarrollo", "");
    setValue("produccionUltimoSiclo", "");
  };

  const createFinca = async (
    nombre: string,
    comunidad: string,
    areaCacaoProduccion: string,
    areaCacaoDesarrollo: string,
    produccionUltimoSiclo: string,
    IDProductor: number
  ) => {
    try {
      const response = await createFincas(
        nombre,
        comunidad,
        areaCacaoProduccion,
        areaCacaoDesarrollo,
        produccionUltimoSiclo,
        IDProductor
      );
    } catch (error) {
      console.error(error);
    }
  };

  const updateFinca = async (
    id: number,
    nombre: string,
    comunidad: string,
    areaCacaoProduccion: string,
    areaCacaoDesarrollo: string,
    produccionUltimoSiclo: string,
    IDProductor: number
  ) => {
    try {
      const response = await updateFincas(
        id,
        nombre,
        comunidad,
        areaCacaoProduccion,
        areaCacaoDesarrollo,
        produccionUltimoSiclo,
        IDProductor
      );
    } catch (error) {
      console.error(error);
    }
  };

  const [productors,setProductors] = useState<Productors[]>([])
  const getAllProductors = async()=>{
    try {
        const response = await getProductors();
        if(response.data !== undefined){
           setProductors(response.data);
        }
        return response;
    } catch (error) {
        console.error(error);
    }
  }

  useEffect(()=>{
    getAllProductors();
  },[]);

  const [idProductors,setIdProductors] = useState();
  return (
    <form className="borde-card">
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
            label="Nombre de la finca"
            variant="outlined"
            {...register("nombre")}
            error={!!errors.nombre}
            helperText={errors?.nombre?.message}
            InputLabelProps={{ shrink: !!nombre || undefined }}
          />
          <TextField
            sx={{ flex: 2 }}
            id="comunidad"
            label="Comunidad de la finca"
            variant="outlined"
            {...register("comunidad")}
            error={!!errors.comunidad}
            helperText={errors?.comunidad?.message}
            InputLabelProps={{ shrink: !!comunidad || undefined }}
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
            id="areaCacaoProduccion"
            label="Area de caco en produccion"
            variant="outlined"
            {...register("areaCacaoProduccion")}
            error={!!errors.areaCacaoProduccion}
            helperText={errors?.areaCacaoProduccion?.message}
            InputLabelProps={{ shrink: !!areaCacaoProduccion || undefined }}
          />
          <TextField
            sx={{ flex: 2 }}
            id="areaCacaoDesarrollo"
            label="Area de caco en Desarrollo"
            variant="outlined"
            {...register("areaCacaoDesarrollo")}
            error={!!errors.areaCacaoDesarrollo}
            helperText={errors?.areaCacaoDesarrollo?.message}
            InputLabelProps={{ shrink: !!areaCacaoDesarrollo || undefined }}
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
            id="produccionUltimoSiclo"
            label="Produccion del ultimo siclo"
            variant="outlined"
            {...register("produccionUltimoSiclo")}
            error={!!errors.produccionUltimoSiclo}
            helperText={errors?.produccionUltimoSiclo?.message}
            InputLabelProps={{ shrink: !!produccionUltimoSiclo || undefined }}
          />
          <FormControl           sx={{ flex: 2 }}>
            <InputLabel id="demo-simple-select-label">Productor</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="idProductor"
            displayEmpty
            label="Productor"
            onChange={() => handleChange}
            defaultValue={10}
            {...register("IDProductor", { required: true })}
            error={!!errors.IDProductor}
          >
          {
            productors.map((item)=>{
                <MenuItem
                onClick={() => setIdProductors(item.id)}
                key={item.id}
                value={item.nombre}
              >
                {item.nombre}
              </MenuItem>
            })
          }
          </Select>
          </FormControl>
          <Tooltip title='Guardar'>
          <button onClick={onClick} className="btn-save" type="submit">
            Guardar
            <SaveRoundedIcon />
          </button>
        </Tooltip>
        </Box>
      </Box>
    </form>
  );
};

export default FincaForm;
