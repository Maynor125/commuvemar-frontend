import { z } from "zod";

export const DatosSchema = z.object({
  titulo: z
    .string()
    .min(5, {
      message: "El titulo debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El titulo debe tener maximo 50 caracteres",
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
