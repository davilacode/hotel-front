
import { z } from 'zod';

export const hotelSchema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  address: z.string().nonempty("La dirección es requerida"),
  city: z.string().nonempty("La ciudad es requerida"),
  nit: z.string().nonempty("El NIT es requerido"),
  total_rooms: z.number().min(1, "El número de habitaciones es requerido"),
});
