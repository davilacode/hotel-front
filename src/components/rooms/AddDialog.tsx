import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RoomsForm } from "./Form"
import { useRooms } from "@/hooks/useRooms"
import { roomsSchema } from "@/schemas/rooms"
import type { z } from "zod"
import { useAddRooms } from "@/hooks/useRooms"
import { useHotels } from "@/hooks/useHotels"


export default function AddRoomDialog() {
  
  const { hotelId, isOpen, onClose } = useAddRooms();
  const { getHotelQuery: { data: hotelData } } = useHotels(hotelId)
  const { createRoomMutation: mutation } = useRooms(hotelId)

  type FormValues = z.input<typeof roomsSchema>;

  const onSubmit = (values: FormValues) => {
    const parsedValues = roomsSchema.parse(values);
    mutation.mutate(parsedValues, {
      onSuccess: () => {
        onClose()      
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar acomodaciones al hotel</DialogTitle>
          {hotelData && <>
            <p className="font-bold">{hotelData.hotel.name}</p>
            <p>acomodaciones totales: {hotelData.hotel.total_rooms}</p>
            <p>Restantes: {hotelData.hotel.total_rooms - hotelData.total_rooms_created}</p>
          </>}
        </DialogHeader>
        <RoomsForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            type: "standard",
            accommodation: "single",
            quantity: 1,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}