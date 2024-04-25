import { z } from "zod";

export const ProductorTrabajadorSchema = z.object({
    IDProductor:z.string().min(1, {
        message: "Debes elegir un productor",
      }),
});