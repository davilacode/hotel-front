import { createFileRoute } from '@tanstack/react-router'
import Tables from '@/components/hotels/Tables'
import AddHotelDialog from '@/components/hotels/AddDialog'
import { useHotels } from '@/hooks/useHotels'
import EditHotelDialog from '@/components/hotels/EditDialog'

export const Route = createFileRoute('/hotels/')({
  component: RouteComponent,
})

function RouteComponent() {

  const { 
    getHotelsQuery: { data, isLoading }
  } = useHotels()

  return (
    <div className='flex flex-col p-4 w-screen max-w-[1400px] mx-auto'>
      <div className="flex flex-row border-b-2 mb-4 items-center justify-between gap-4 bg-white p-4 shadow-">
        <div>
          <h1 className="font-bold text-2xl">Hoteles</h1>
          <p>Módulo para agregar hoteles</p>
        </div>
        <AddHotelDialog />
      </div>

      {isLoading ? (
        <div>Cargando...</div> 
        ) : (
          <Tables
            data={data || []}
          />
        )
      }
      <EditHotelDialog />
    </div>
  )
}