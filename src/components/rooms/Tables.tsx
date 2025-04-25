import { Table as UITable, TableHeader, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { useEditRooms } from '@/hooks/useRooms';

type Props = {
  data: {
    id: number;
    hotel_id: number;
    type: string;
    accommodation: string;
    quantity: number;
  }[];
}

export default function Table({ data }: Props) {

  const { onOpen } = useEditRooms();
  
  return (
    <UITable className="w-full mx-auto">
      <TableCaption>Listado de habitaciones.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Acomodacion</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((room) => (
          <TableRow key={room.id}>
            <TableCell>{room.type}</TableCell>
            <TableCell>{room.accommodation}</TableCell>
            <TableCell>{room.quantity}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="secondary" onClick={() => onOpen(room.hotel_id, room.id)}>
                Editar
              </Button>
              <Button variant="destructive" onClick={() => console.log('Delete', room.id)}>
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No hay habitaciones disponibles.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </UITable>
  );
}