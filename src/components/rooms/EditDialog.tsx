import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RoomsForm } from "./Form"
import { roomsSchema } from "@/schemas/rooms"
import type { z } from "zod"
import { useEditRooms, useRooms } from "@/hooks/useRooms"
import { useHotels } from "@/hooks/useHotels"

export default function EditRoomDialog() {

  const { isOpen, onClose, hotelId, id } = useEditRooms();


  const { getHotelQuery: { data: hotelData } } = useHotels(hotelId)
  const { getRoomQuery: { data: roomData, isLoading },
    updateRoomMutation: mutation } = useRooms(hotelId, id)

  type FormValues = z.input<typeof roomsSchema>;

  const defaultValues = roomData
  ? {
    type: roomData.type,
    accommodation: roomData.accommodation,
    quantity: roomData.quantity,
  }
  : {
    type: "standard",
    accommodation: "single",
    quantity: 1,
  };

  const onSubmit = (values: FormValues) => {
    const parsedValues = roomsSchema.parse(values);
    mutation.mutate(parsedValues, {
      onSuccess: () => {
        onClose();
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader className="text-left">
          <DialogTitle>Editar habitaciones de hotel</DialogTitle>
          {hotelData && <>
            <p className="font-bold">{hotelData.hotel.name}</p>
            <p>Habitaciones totales: {hotelData.hotel.total_rooms}</p>
            <p>Restantes: {hotelData.hotel.total_rooms - hotelData.total_rooms_created}</p>
          </>}
        </DialogHeader>
        { isLoading ? (
          <div>Cargando...</div>  
        ) : (
          <RoomsForm
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