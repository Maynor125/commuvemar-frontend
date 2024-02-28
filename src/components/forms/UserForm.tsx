'use client'

import { Box, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { User } from '@/types/user';
import { UserSchema } from '@/validations/userSchema';
import { createUsers,updateUsers } from '@/utils/userW';
import { Workers } from '@/types/inspectors';
import { getWorkers } from '@/utils/workers';

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
const UserForm = () => {
    

    const resolver: Resolver<User, FieldErrors<User>> = async (data) => {
        try {
          // Validar los datos con zod
          await UserSchema.parseAsync(data);
          // Devolver los valores correctamente
          return { values: data, errors: {} };
        } catch (error) {
          // Manejar errores de validación
          const zodError = error as ZodError;
    
          // Construir el objeto de errores
          const fieldErrors: FieldErrors<User> = {};
          zodError.errors.forEach((issue) => {
            if (issue.path) {
              // Asignar errores a los campos correspondientes
              const fieldName = issue.path[0] as keyof User;
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
      } = useForm<User>({
        resolver: resolver,
      });
    
  return (
    <form >
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
          <FormControl           sx={{ flex: 2 }}>
            <InputLabel id="demo-simple-select-label">Productor</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="idProductor"
            label="Productor"
            defaultValue={10}
            {...register("productor", { required: true })}
            error={!!errors.productor}
            onChange={handleChange}
          >
            <MenuItem disabled value={10}>
              <em> {fincaState.isEdit ? fincaState.productor: ""}</em>
            </MenuItem>
          { productors.map((item)=>(
                <MenuItem
                onClick={() => setIdProductors(item.id)}
                key={item.id}
                value={item.nombre}
              >
                {item.nombre}
              </MenuItem>
          ))
          }
          </Select>
          {errors?.productor && <FormHelperText sx={{
            color:'red',
          }}>{errors.productor.message}</FormHelperText>}
          </FormControl>
         <TextField
            sx={{ flex: 2 }}
            id="Email"
            label="Nombre de la finca"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            /*defaultValue={fincaState.isEdit ? fincaState.nombre:""}
            InputLabelProps={{ shrink: !!fincaState.nombre || undefined }}*/
          />
        </Box>
      </Box>
    </form>
  )
}

export default UserForm