'use client'

import TextField from "@mui/material/TextField";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { LoginSchema } from "@/validations/loginSchema";
import {
  useForm,
  Resolver,
  FieldErrors,
} from "react-hook-form";

import { LoginFormValues } from "@/types/login";
import { ZodError } from "zod";
import { useState } from "react";

const LoginForm = () => {
    //Manejo del estado para mostrar la contraseña.
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };


  const resolver: Resolver<
    LoginFormValues,
    FieldErrors<LoginFormValues>
  > = async (data) => {
    try {
      // Validar los datos con zod
      await LoginSchema.parseAsync(data);
      // Devolver los valores correctamente
      return { values: data, errors: {} };
    } catch (error) {
      // Manejar errores de validación
      const zodError = error as ZodError;

      // Construir el objeto de errores
      const fieldErrors: FieldErrors<LoginFormValues> = {};
      zodError.errors.forEach((issue) => {
        if (issue.path) {
          // Asignar errores a los campos correspondientes
          const fieldName = issue.path[0] as keyof LoginFormValues;
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

  // ...

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: resolver,
  });

  // Manejar la lógica de envío del formulario
  const onSubmit = (data: LoginFormValues) => {
    console.log("Formulario de inicio de sesión enviado:", data);
    // Aquí ira la lógica de inicio de sesión
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form">
    <TextField
      id="email"
      label="Digita tu email"
      variant="outlined"
      size="medium"
      {...register("email")}
      error={!!errors.email}
      helperText={errors?.email?.message}
    />

    <FormControl sx={{ width: "100%" }} variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password" error={!!errors.password}>
        Password
      </InputLabel>
      <OutlinedInput
        id="password"
        type={showPassword ? "text" : "password"}
        size="medium"
        error={!!errors.password}
        {...register("password")}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label="Password"
      />
      {errors.password && (
        <FormHelperText sx={{color:'#D43333'}}>
          {errors.password.message}
        </FormHelperText>
        /*<p className="msj-error">
          {errors.password.message}
        </p>*/
      )}
    </FormControl>
    <button type="submit" className="boton btn-login">
      Login
    </button>
  </form>
  )
}

export default LoginForm