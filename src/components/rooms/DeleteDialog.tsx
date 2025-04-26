import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteRooms, useRooms } from "@/hooks/useRooms"

export const DeleteRoomsDialog = () => {

  const { isOpen, onClose, hotelId, id } = useDeleteRooms()
  const { deleteRoomMutation } = useRooms(hotelId, id)

  const onDelete = () => {
    deleteRoomMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar acomodación</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este acomodación? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" disabled={deleteRoomMutation.isPending} onClick={()=> onClose()}>Cancelar</Button>
          <Button variant="destructive" disabled={deleteRoomMutation.isPending} onClick={() => onDelete()}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}