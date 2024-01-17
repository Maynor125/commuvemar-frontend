import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Ingrese un correo electrónico válido." })
    .refine((data) => data.includes("@"), {
      message: "Ingrese un correo electrónico válido.",
    }),
  password: z.string().min(6, {
    message: "La contraseña debe tener al menos 6 caracteres.",
  }),
});
