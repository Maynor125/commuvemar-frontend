"use client";

import {
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";
import { User } from "@/types/user";
import { UserSchema } from "@/validations/userSchema";
import { createUsers, getAllUsers, updateUsers } from "@/services/userW";
import { Workers } from "@/types/inspectors";
import { getWorkers } from "@/services/workers";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { SelectChangeEvent } from "@mui/material";

interface GeneralActionProps {
  onClick: () => void;
}

const UserForm: React.FC<GeneralActionProps> = ({ onClick }) => {
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

  useEffect(() => {
    if (userState.isEdit) {
      setRolDisabled(true);
      setWorkerDisabled(true);
      setValueRol(userState.role);
    } else {
      setRolDisabled(false);
      setWorkerDisabled(false);
    }
  }, [userState]);

  useEffect(() => {
    if (userState.isEdit) {
      setValue("email", userState.email); // Asignar valor inicial de email
      setValue("hash", userState.hash); 
      setValue("role",userState.role)// Asignar valor inicial de hash
      setValueRol(userState.role); // Asignar valor inicial de role
    }
  }, [userState.isEdit]);

  const [rolDisabled, setRolDisabled] = useState(false);
  const [workerDisabled,setWorkerDisabled] = useState(false);
  const [IDTrabajador, setIDTrabajador] = useState(0);

  const [valueRol, setValueRol] = useState(
    userState.isEdit ? userState.role : ""
  );
  console.log("El trabajador es", IDTrabajador);
  const handleChangeSelectRol = (event: SelectChangeEvent<string>) => {
    setValueRol(event.target.value as string);
  };

  const createUser = async (email: string, hash: string, role: string ) => {
    try {
      const response = await createUsers(email, hash, role, IDTrabajador);
      if (response !== undefined) {
        onClick();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (
    id: number,
    email: string,
    hash: string,
  ) => {
    try {
      const response = await updateUsers(
        id,
        email,
        hash,
        userState.role,
        userState.IDTrabajador
      );
      if (response !== undefined) {
        onClick();
      }
    } catch (error) {}
  };

  const onSubmit = (data: User) => {
    console.log("Datos del formulario", data);
    try {
      if (userState.isEdit) {
        if (userState.id && userState.id > 0) {
          updateUser(userState.id, data.email, data.hash);
        }
      } else {
        createUser(data.email, data.hash, data.role);
      }
    } catch (error) {
      console.error(error);
    }
    setValue("email", "");
    setValue("hash", "");
    setValue("role", "");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="borde-card">
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
              id="idTrabajador"
              label="Trabajador"
              defaultValue={10}
              {...register("IDTrabajador", { required: true })}
              error={!!errors.IDTrabajador}
              onChange={handleChange}
              disabled={workerDisabled}
            >
              <MenuItem disabled value={10}>
                <em> {userState.isEdit ? userState.trabajador : ""}</em>
              </MenuItem>
              {worker.map((item) => (
                <MenuItem
                  onClick={() => setIDTrabajador(item.id)}
                  key={item.id}
                  value={item.nombre}
                >
                  {item.nombre}
                </MenuItem>
              ))}
            </Select>
            {errors?.IDTrabajador && (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {errors.IDTrabajador.message}
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
            <InputLabel id="rol-label">Rol</InputLabel>
            <Select
              labelId="rol-label"
              id="Rol"
              value={valueRol}
              label="Rol"
              {...register("role", { required: true })}
              error={!!errors.role}
              onChange={handleChangeSelectRol}
              disabled={rolDisabled}
            >
              <MenuItem value={"ADMIN"}>Administrador</MenuItem>
              <MenuItem value={"USER"}>usuario</MenuItem>
            </Select>
            {errors?.role && (
              <FormHelperText
                sx={{
                  color: "red",
                }}
              >
                {errors.role.message}
              </FormHelperText>
            )}
          </FormControl>
          <Tooltip title="Guardar">
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

export default UserForm;
