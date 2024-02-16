import { z } from "zod";

export const FincaSchema = z.object({
  nombre: z
    .string()
    .min(5, {
      message: "El nombre debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "el nombre debe tener maximo 50 caracteres",
    }),
  comunidad: z
    .string()
    .min(5, {
      message: "La comunidad debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "La comunidad debe tener maximo 50 caracteres",
    }),
    areaCacaoProduccion: z
    .string()
    .min(5, {
      message: "El dato debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El dato debe tener maximo 50 caracteres",
    }),
    areaCacaoDesarrollo: z
    .string()
    .min(5, {
      message: "El dato debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El dato debe tener maximo 50 caracteres",
    }),
    produccionUltimoSiclo: z
    .string()
    .min(5, {
      message: "El dato debe tener al menos 5 caracteres",
    })
    .max(50, {
      message: "El dato debe tener maximo 50 caracteres",
    }),
    IDProductor:z.string()
});
