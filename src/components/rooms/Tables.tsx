import { Table as UITable, TableHeader, TableBody, TableCaption, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Button } from '../ui/button';
import { useDeleteRooms, useEditRooms } from '@/hooks/useRooms';
import { Trash, Edit } from 'lucide-react';

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

  const { onOpen: onOpenEdit } = useEditRooms();
  const { onOpen: onOpenDelete } = useDeleteRooms();
  
  return (
    <UITable className="w-full mx-auto">
      <TableCaption>Listado de acomodaciones.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Tipo</TableHead>
          <TableHead>Acomodación</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-right">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((room) => (
          <TableRow key={room.id}>
            <TableCell className="capitalize">{room.type}</TableCell>
            <TableCell className="capitalize">{room.accommodation}</TableCell>
            <TableCell>{room.quantity}</TableCell>
            <TableCell className="text-right space-x-2">
              <Button variant="secondary" onClick={() => onOpenEdit(room.hotel_id, room.id)}>
                <Edit />
                Editar
              </Button>
              <Button variant="destructive" onClick={() => onOpenDelete(room.hotel_id, room.id)}>
                <Trash />
                Eliminar
              </Button>
            </TableCell>
          </TableRow>
        ))}
        {data?.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              No hay acomodaciones disponibles.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </UITable>
  );
}