import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { DialogFooter, DialogHeader } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useDeleteHotel, useHotels } from "@/hooks/useHotels"

export const DeleteHotelDialog = () => {

  const { isOpen, onClose, id } = useDeleteHotel()
  const { deleteHotelMutation } = useHotels(id)

  const onDelete = () => {
    deleteHotelMutation.mutate(undefined, {
      onSuccess: () => {
        onClose();
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Eliminar hotel</DialogTitle>
          <DialogDescription>
            ¿Estás seguro de que deseas eliminar este hotel? Esta acción no se puede deshacer.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" disabled={deleteHotelMutation.isPending} onClick={()=> onClose()}>Cancelar</Button>
          <Button variant="destructive" disabled={deleteHotelMutation.isPending} onClick={() => onDelete()}>Eliminar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}