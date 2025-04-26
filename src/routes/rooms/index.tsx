import { createFileRoute } from '@tanstack/react-router'
import Tables from '@/components/rooms/Tables'
import AddRoomsDialog from '@/components/rooms/AddDialog'
import { useRooms, useAddRooms } from '@/hooks/useRooms'
import EdiRoomslDialog from '@/components/rooms/EditDialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useEffect, useState } from 'react'
import { useHotels } from '@/hooks/useHotels'
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteRoomsDialog } from '@/components/rooms/DeleteDialog'

export const Route = createFileRoute('/rooms/')({
  component: RouteComponent,
})

type Hotel = {
  id: number
  name: string
  address: string
  city: string
  nit: string
  total_rooms: number
}

function RouteComponent() {

  const [hotelId, setHotelId] = useState<number | null>(null)

  const { onOpen } = useAddRooms()

  const { 
    getHotelsQuery: { data: hotelData, isLoading: isHotelLoading }
  } = useHotels()

  const { 
    getRoomsQuery: { data: roomsData, isLoading: isRoomsLoading }
  } = useRooms(hotelId || hotelData?.[0]?.id)

  useEffect(() => {
    if (hotelData && hotelData.length > 0) {
      setHotelId(hotelData[0].id)
    }
  }, [hotelData])

  return (
    <div className='flex flex-col p-4 w-screen max-w-[1400px] mx-auto'>
      <div className="flex flex-col md:flex-row border-b-2 mb-4 items-center justify-between gap-4 bg-white py-4">
        <div className="w-full md:w-auto">
          <h1 className="font-bold text-2xl">Acomodaciones</h1>
          <p>Módulo para agregar acomodaciones</p>
        </div>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          <Select onValueChange={
            (value) => {
              setHotelId(Number(value))
            }}
            value={String(hotelId)}
            disabled={isHotelLoading}
          >
            <SelectTrigger className="w-full md:w-[250px]">
              <SelectValue placeholder={isHotelLoading ? "Cargando..." : "Hoteles"} />
            </SelectTrigger>
            <SelectContent>
              {hotelData?.map(( hotel: Hotel ) => (
                <SelectItem key={hotel.id} value={String(hotel.id)}>
                  {hotel.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="default" className="w-full md:w-auto" onClick={() => hotelId !== null && onOpen(hotelId) } >
            <PlusCircle />
            <span>Registrar habitaciones</span>
          </Button>
        </div>
      </div>
      {isRoomsLoading ? (
        <div>Cargando...</div> 
      ) : (
        <Tables data={roomsData || []} />
      )
    }
      
      <EdiRoomslDialog />
      <AddRoomsDialog />
      <DeleteRoomsDialog />
    </div>
  )
}