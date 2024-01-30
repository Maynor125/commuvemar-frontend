"use client";

import TextField from "@mui/material/TextField";
import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useTheme,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/navigation";

import { LoginSchema } from "@/validations/loginSchema";
import { useForm, Resolver, FieldErrors } from "react-hook-form";

import { LoginFormValues } from "@/types/login";
import { ZodError } from "zod";
import { useState } from "react";

import { useDispatch } from "react-redux";
import { login } from "@/utils/login";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const LoginForm = () => {
  //Manejo del estado para mostrar la contraseña.
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const theme = useTheme();

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  console.log("el error es:", error);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: resolver,
  });

  const dispatch = useDispatch();

  const handleLogin = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await login(dispatch, email, password); // Asegúrate de pasar dispatch como el primer argumento
  
      setTimeout(() => {
        if (response.error) {
          setError(response.error);
          setLoading(false);
        } else {
          setError(null);
          setLoading(false);
          router?.push("/admin");
        }
      }, 2000);
    } catch (error: any) {
      setLoading(false);
    }
  };

  //user:jhonosmanm@gmail.com  password:123456

  // Manejar la lógica de envío del formulario
  const onSubmit = (data: LoginFormValues) => {
    console.log("Formulario de inicio de sesión enviado:", data);

    // Aquí ira la lógica de inicio de sesión
    handleLogin(data.email, data.password);
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
        <InputLabel
          htmlFor="outlined-adornment-password"
          error={!!errors.password}
        >
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
          <FormHelperText sx={{ color: "#D43333" }}>
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
      {error !== null && (
     
          <Typography
            sx={{
              width: "100%",
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: ".4rem",
              textAlign: "center",
              margin:'0 auto',
              fontSize:'14px'
            }}
          >
            <ErrorOutlineIcon />
            {error}
          </Typography>
      
      )}
      {loading && (
        <Backdrop
          open={true}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </form>
  );
};

export default LoginForm;
