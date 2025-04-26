import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { HotelForm } from "./Form"
import { useHotels } from "@/hooks/useHotels"
import { hotelSchema } from "@/schemas/hotels"
import { useState } from "react"
import type { z } from "zod"

export default function AddHotelDialog() {

  const [open, setOpen] = useState(false)

  const { createHotelMutation: mutation } = useHotels()

  type FormValues = z.input<typeof hotelSchema>;

  const onSubmit = (values: FormValues) => {
    const parsedValues = hotelSchema.parse(values);
    mutation.mutate(parsedValues, {
      onSuccess: () => {
        setOpen(false)      
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PlusCircle />
          <span>Agregar Hotel</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Agregar un hotel</DialogTitle>
        </DialogHeader>
        <HotelForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            address: "",
            nit: "",
            city: "",
            total_rooms: 1,
          }}
        />
      </DialogContent>
    </Dialog>
  )
}