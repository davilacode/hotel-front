import { Table as UITable, TableHeader, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { useEditHotel } from '@/hooks/useHotels';

type Props = {
  data: {
    id: string;
    name: string;
    address: string;
    city: string;
    nit: string;
    quantity: number;
  }[];
}

export default function Table({ data }: Props) {

  const { onOpen } = useEditHotel();
  
  return (
    <UITable className="w-full mx-auto">
      <TableCaption>Listado de hoteles.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Ubicacion</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((hotel) => (
          <TableRow key={hotel.id}>
            <TableCell className="font-medium">{hotel.id}</TableCell>
            <TableCell>
              <div className="d-block font-bold">{hotel.name}</div>
              <div className="d-block">NIT: {hotel.nit}</div>
            </TableCell>
            <TableCell>
              <div className="d-block font-bold">{hotel.address}</div>
              <div className="d-block">{hotel.city}</div>
            </TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="secondary" onClick={() => onOpen(Number(hotel.id))}>
                Editar
              </Button>
              <Button variant="destructive" onClick={() => console.log('Delete', hotel.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
}