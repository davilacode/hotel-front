import { createFileRoute } from '@tanstack/react-router'
import Tables from '@/components/hotels/Tables'
import AddHotelDialog from '@/components/hotels/AddDialog'
import { useHotels } from '@/hooks/useHotels'
import EditHotelDialog from '@/components/hotels/EditDialog'
import { DeleteHotelDialog } from '@/components/hotels/DeleteDialog'

export const Route = createFileRoute('/hotels/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { 
    getHotelsQuery: { data, isLoading }
  } = useHotels()

  return (
    <div className='flex flex-col p-4 w-screen max-w-[1400px] mx-auto'>
      <div className="flex flex-col sm:flex-row border-b-2 mb-4 items-center justify-between gap-4 bg-white py-4">
        <div className="w-full sm:w-auto">
          <h1 className="font-bold text-2xl">Hoteles</h1>
          <p>Módulo para agregar hoteles</p>
        </div>
        <AddHotelDialog />
      </div>

      {isLoading ? (
        <div>Cargando...</div> 
        ) : (
          <Tables data={data || []} />
        )
      }
      <EditHotelDialog />
      <DeleteHotelDialog />
    </div>
  )
}