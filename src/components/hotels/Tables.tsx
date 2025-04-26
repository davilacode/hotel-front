import { Table as UITable, TableHeader, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { useDeleteHotel, useEditHotel } from '@/hooks/useHotels';
import { Link } from '@tanstack/react-router';
import { Edit, Trash, View } from 'lucide-react';


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

  const { onOpen: onOpenEdit } = useEditHotel();
  const { onOpen: onOpenDelete } = useDeleteHotel();
  
  return (
    <UITable className="w-full mx-auto">
      <TableCaption>Listado de hoteles.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Ubicación</TableHead>
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
              <Button variant="outline" asChild>
                <Link 
                  to="/hotels/$hotelId"
                  params={{ hotelId: hotel.id }}
                >
                  <View />
                  Ver
                </Link>
              </Button>
              <Button variant="secondary" onClick={() => onOpenEdit(Number(hotel.id))}>
                <Edit />
                Editar
              </Button>
              <Button variant="destructive" onClick={() => onOpenDelete(Number(hotel.id))}>
                <Trash />
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </UITable>
  );
}