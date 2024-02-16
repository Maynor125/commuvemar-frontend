import { z } from "zod";

export const ProductorsSchema = z.object({
  nombre: z
    .string()
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "el nombre debe tener maximo 50 caracteres",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
  apellido: z
    .string()
    .min(5, {
      message: "El apellido debe tener al menos 15 caracteres",
    })
    .max(50, {
      message: "El apellido debe tener maximo 50 caracteres",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    }),
  numeroTelefono: z
    .string()
    .min(8, {
      message: "El numero de telefono debe tener al menos 8 caracteres",
    })
    .max(8, {
      message: "El numero de telefono debe tener maximo 8 caracteres",
    })
    .refine((data) => !/^\s+$/.test(data), {
      message: "La cadena no debe contener solo espacios en blanco",
    })
    .refine((data) => /^[0-9+\s]+$/.test(data), {
      message:
        "El número de teléfono solo puede contener números",
    }),
  numeroCedula:z.string().length(13, {
    message: "El número de cédula debe tener exactamente 13 caracteres",
  }),
  fechaIngresoPrograma:z.date(),
  estado: z.enum(['1', '2', '3']),
});