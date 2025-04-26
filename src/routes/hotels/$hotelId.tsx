import { createFileRoute, Link } from '@tanstack/react-router'
import Tables from '@/components/rooms/Tables'
import { useEditHotel, useHotels } from '@/hooks/useHotels'
import { useAddRooms, useRooms } from '@/hooks/useRooms'
import EditHotelDialog from '@/components/hotels/EditDialog'
import EditRoomDialog from '@/components/rooms/EditDialog'
import { Button } from '@/components/ui/button'
import AddRoomDialog from '@/components/rooms/AddDialog'
import { ArrowLeft, Edit, PlusCircle } from 'lucide-react'
import { DeleteRoomsDialog } from '@/components/rooms/DeleteDialog'

export const Route = createFileRoute('/hotels/$hotelId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { hotelId } = Route.useParams()

  const { onOpen } = useEditHotel()
  const { onOpen: onOpenRoom } = useAddRooms()
  const { 
    getHotelQuery: { data: hotelData, isLoading: isHotelLoading }
  } = useHotels(Number(hotelId))
  
  const { 
    getRoomsQuery: { data: roomsData, isLoading: isRoomsLoading }
  } = useRooms(Number(hotelId))

  return (
    <div className='flex flex-col p-4 w-screen max-w-[1400px] mx-auto'>
      {isHotelLoading ? (
        <div>Cargando...</div>
        ) : (
        <>
          <div className="flex flex-col sm:flex-row border-b-2 mb-4 items-center justify-between gap-4 bg-white py-4">
            <div className=" w-full md:w-auto">
              <h1 className="font-bold text-2xl">{hotelData?.hotel?.name || ''}</h1>
            </div>
            <div className='flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto'>
              <Button className="w-full sm:w-auto" variant="secondary" asChild>
                <Link to="/hotels">
                  <ArrowLeft />
                  Volver
                </Link>
              </Button>
              <Button className="w-full sm:w-auto" onClick={() => { onOpen(Number(hotelId)) } }>
                <Edit />
                Editar
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-white shadow-lg rounded-md p-4">
            <div>
              <h2 className="font-bold">Dirección:</h2>
              <p>{hotelData?.hotel?.address || ''}</p>
            </div>
            <div>
              <h2 className="font-bold">NIT:</h2>
              <p>{hotelData?.hotel?.nit || ''}</p>
            </div>
            <div>
              <h2 className="font-bold">Capacidad:</h2>
              <p>{hotelData?.hotel?.total_rooms || ''}</p>
            </div>
            <div>
              <h2 className="font-bold">Total de acomodaciones creadas:</h2>
              <p>{hotelData?.total_rooms_created || ''}</p>
            </div>
          </div>
        </>
      )}

      <div className="flex flex-row items-center justify-end mb-4">
        <Button className="w-full sm:w-auto" onClick={() => { onOpenRoom(Number(hotelId)) } }>
          <PlusCircle />
          Agregar acomodación
        </Button>
      </div>
      {isRoomsLoading ? (
        <div>Cargando...</div> 
      ) : (
        <Tables data={roomsData || []} />
      )
    }
      <EditHotelDialog />
      <AddRoomDialog />
      <EditRoomDialog />
      <DeleteRoomsDialog />
    </div>
  )
}