import { z } from "zod";

export const SectionsSchema = z.object({
  nombre: z
    .string()
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "el nombre debe tener maximo 50 caracteres",
    }),
  descripcion: z
    .string()
    .min(15, {
      message: "La descripcion debe tener al menos 15 caracteres",
    })
    .max(200, {
      message: "La descripcion debe tener maximo 200 caracteres",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
});
