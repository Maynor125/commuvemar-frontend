'use client'

import { TextField } from "@mui/material";

//Para validar el formulario.
import { EmailFormValues } from "@/types/email";
import { EmailSchema } from "@/validations/emailSchema";
import { ZodError } from "zod";
import { useForm, Resolver, FieldErrors } from "react-hook-form";


const EmailForm = () => {
    //Validacion del formulario.

  const resolver: Resolver<
  EmailFormValues,
  FieldErrors<EmailFormValues>
> = async (data) => {
  try {
    // Validar los datos con zod
    await EmailSchema.parseAsync(data);
    // Devolver los valores correctamente
    return { values: data, errors: {} };
  } catch (error) {
    // Manejar errores de validación
    const zodError = error as ZodError;

    // Construir el objeto de errores
    const fieldErrors: FieldErrors<EmailFormValues> = {};
    zodError.errors.forEach((issue) => {
      if (issue.path) {
        // Asignar errores a los campos correspondientes
        const fieldName = issue.path[0] as keyof EmailFormValues;
        fieldErrors[fieldName] = {
          type: "validation", // Asegúrate de ajustar esto según tus necesidades
          message: issue.message ?? "Error de envio",
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
} = useForm<EmailFormValues>({
  resolver: resolver,
});

// Manejar la lógica de envío del formulario
const onSubmit = (data: EmailFormValues) => {
  console.log("Formulario de email enviado:", data);
  // Aquí ira la lógica de email
};
  return (
    <form id="formu" onSubmit={handleSubmit(onSubmit)}>
    <TextField
      id="name"
      label="Escribe tu nombre"
      variant="outlined"
      size="small"
      sx={{
        mt: 5,
        width: "90%",
      }}
      {...register("name")}
      error={!!errors.name}
      helperText={errors?.name?.message}
    />
    <TextField
      type="email"
      id="email"
      label="Escribe tu correo electronico"
      variant="outlined"
      size="small"
      sx={{
        mt: 4,
        width: "90%",
      }}
      {...register("email")}
      error={!!errors.email}
      helperText={errors?.email?.message}
    />
    <TextField
      id="mensaje"
      label="Escribe tu mensaje"
      multiline
      rows={4}
      size="small"
      sx={{
        mt: 4,
        width: "90%",
      }}
      {...register("mensaje")}
      error={!!errors.mensaje}
      helperText={errors?.mensaje?.message}
    />
    <input
      className="boton-base btn-enviar"
      type="submit"
      value="Enviar"
    />
  </form>
  )
}

export default EmailForm