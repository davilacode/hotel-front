import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { HotelForm } from "./HotelForm"
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
    name: hotelData.name,
    address: hotelData.address,
    nit: hotelData.nit,
    city: hotelData.city,
    total_rooms: hotelData.total_rooms,
  }
  : {
    name: "",
    address: "",
    nit: "",
    city: "",
    total_rooms: 0,
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