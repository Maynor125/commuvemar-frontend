"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { User } from "@/types/user";
import { UserSchema } from "@/validations/userSchema";
import { createUsers, getAllUsers, updateUsers } from "@/utils/userW";
import { Workers } from "@/types/inspectors";
import { getWorkers } from "@/utils/workers";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { SelectChangeEvent } from "@mui/material";

const UserForm = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state: RootState) => state.user);

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

  const [valorIdActivo, setValorIdActivo] = useState(false);
  const [age, setAge] = useState();
  const handleChange = (event: any) => {
    setAge(event.target.value);
    setValorIdActivo(true);
  };

  const [worker, setWorker] = useState<Workers[]>([]);
  const getAllWorker = async () => {
    try {
      const response = await getWorkers();
      if (response.data !== undefined) {
        setWorker(response.data);
      }
      return response;
    } catch (error) {}
  };

  useEffect(() => {
    getAllWorker();
  }, []);
  const [idProductors, setIdProductors] = useState(0);

  const [valueRol, setValueRol] = useState(
    userState.isEdit ? userState.rol : ""
  );

  const handleChangeSelectRol = (event: SelectChangeEvent<string>) => {
    setValueRol(event.target.value as string);
  };

  return (
    <form className="borde-card" >
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
          <FormControl sx={{ flex: 2 }}>
            <InputLabel id="demo-simple-select-label">Productor</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="idProductor"
              label="Productor"
              defaultValue={10}
              {...register("IDTrabajador", { required: true })}
              error={!!errors.IDTrabajador}
              onChange={handleChange}
            >
              <MenuItem disabled value={10}>
                <em> {userState.isEdit ? userState.trabajador : ""}</em>
              </MenuItem>
              {worker.map((item) => (
                <MenuItem
                  onClick={() => setIdProductors(item.id)}
                  key={item.id}
                  value={item.nombre}
                >
                  {item.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors?.trabajador && (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {errors.trabajador.message}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            sx={{ flex: 2 }}
            id="Email"
            label="Email"
            variant="outlined"
            {...register("email")}
            error={!!errors.email}
            helperText={errors?.email?.message}
            defaultValue={userState.isEdit ? userState.email : ""}
            InputLabelProps={{ shrink: !!userState.email || undefined }}
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
            id="Password"
            label="Password"
            variant="outlined"
            {...register("hash")}
            error={!!errors.hash}
            helperText={errors?.hash?.message}
            defaultValue={userState.isEdit ? userState.hash : ""}
            InputLabelProps={{ shrink: !!userState.hash || undefined }}
          />
            <FormControl sx={{ flex: 2 }}>
              <InputLabel id="estado-label">Estado</InputLabel>
              <Select
                labelId="estado-label"
                id="estado"
                value={valueRol}
                label="Estado"
                {...register("rol", { required: true })}
                error={!!errors.rol}
                onChange={handleChangeSelectRol}
              >
               
                <MenuItem value={"admin"}>Administrador</MenuItem>
                <MenuItem value={"user"}>usuario</MenuItem>
              </Select>
              {errors?.rol && (
                <FormHelperText
                  sx={{
                    color: "red",
                  }}
                >
                  {errors.rol.message}
                </FormHelperText>
              )}
            </FormControl>
        </Box>
      </Box>
    </form>
  );
};

export default UserForm;
