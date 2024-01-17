import { z } from "zod";

export const EmailSchema = z.object({
  name: z
    .string()
    .min(10, {
      message: "Name must be at least 10 characters long",
    })
    .max(100, {
      message: "Name must be at least 200 characters long",
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
  message: z
    .string()
    .min(20, {
      message: "Message must be at least 10 characters long",
    })
    .max(400, {
      message: "Message must be at least 400 characters long",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
});
