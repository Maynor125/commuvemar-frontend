import { z } from "zod";

export const InfoDatosSchema = z.object({
    informacion:z.string().min(5, {
        message: "El texto debe tener al menos 5 caracteres",
      })
      .max(400, {
        message: "El texto debe tener maximo 400 caracteres",
      }),
      descripcion:z.string()
})