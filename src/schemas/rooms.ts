import { z } from 'zod';

export const roomsSchema = z.object({
  type: z.enum(["standard", "junior", "suite"]),
  accommodation: z.enum(["single", "double", "triple", "quadruple"]),
  quantity: z.number().min(1, "El número de habitaciones es requerido"),
}).refine((data) => {
  if (data.type === "standard") {
    return ["single", "double"].includes(data.accommodation);
  }
  if (data.type === "junior") {
    return ["triple", "quadruple"].includes(data.accommodation);
  }
  if (data.type === "suite") {
    return ["single", "double", "triple"].includes(data.accommodation);
  }
  return true;
}, {
  message: "La acomodación no es válida para el tipo de habitación seleccionado",
  path: ["accommodation"],
});
