import { z } from "zod";

export const ProductorTrabajadorSchema = z.object({
  IDProductor: z.union([
    z.string().min(1, {
        message: "Debes elegir un productor como cadena de texto",
    }),
    z.number().int().min(1, {
        message: "Debes elegir un productor como número entero positivo",
    })
])
});