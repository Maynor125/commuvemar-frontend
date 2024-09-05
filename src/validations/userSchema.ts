import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email("El email proporcionado no es válido"),
  role: z
    .string()
    .min(1, {
      message: "Debes elegir un rol para el usuario",
    }).refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
  hash: z
    .string().regex(/[a-zA-Z0-9]+/, "La contraseña debe contener letras y números")
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .max(20, {
      message: "La contraseña debe tener maximo 20 caracteres",
    }),
  IDTrabajador: z.string().min(1, {
    message: "Debes elegir a un trabajador",
  }),
});
