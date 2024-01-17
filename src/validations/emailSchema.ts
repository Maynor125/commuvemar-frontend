import { z } from "zod";

export const EmailSchema = z.object({
  name: z
    .string()
    .min(5, {
      message: "Name must be at least 5 characters long",
    })
    .max(100, {
      message: "Name must be at least 100 characters long",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
  email: z
    .string()
    .email({ message: "Ingrese un correo electrónico válido." })
    .refine((data) => data.includes("@"), {
      message: "Ingrese un correo electrónico válido.",
    }),
  mensaje: z
    .string()
    .min(20, {
      message: "Message must be at least 20 characters long",
    })
    .max(400, {
      message: "Message must be at least 400 characters long",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
});
