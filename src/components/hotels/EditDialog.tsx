import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HotelForm } from "./Form"
import { useEditHotel, useHotels } from "@/hooks/useHotels"
import { hotelSchema } from "@/schemas/hotels"
import type { z } from "zod"

export default function EditHotelDialog() {

  const { isOpen, onClose, id } = useEditHotel();

  const {
    getHotelQuery: { data: hotelData, isLoading }, 
    updateHotelMutation: mutation
  } = useHotels(id)

  type FormValues = z.input<typeof hotelSchema>;

  const defaultValues = hotelData
  ? {
    name: hotelData.hotel.name,
    address: hotelData.hotel.address,
    nit: hotelData.hotel.nit,
    city: hotelData.hotel.city,
    total_rooms: hotelData.hotel.total_rooms,
  }
  : {
    name: "",
    address: "",
    nit: "",
    city: "",
    total_rooms: 1,
  };

  const onSubmit = (values: FormValues) => {
    const parsedValues = hotelSchema.parse(values);
    mutation.mutate(parsedValues, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar un hotel</DialogTitle>
        </DialogHeader>
        { isLoading ? (
          <div>Cargando...</div>  
        ) : (
          <HotelForm
            id={id}
            onSubmit={onSubmit}
            disabled={mutation.isPending}
            defaultValues={defaultValues}
          />
        )
        }
      </DialogContent>
    </Dialog>
  )
}