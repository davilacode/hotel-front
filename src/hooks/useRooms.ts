import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from 'sonner';
import { createRoom, getRoom, getRooms, updateRoom } from "@/api/hotels";

import { create } from 'zustand';

type RoomState = {
  id?: number;
  hotelId: number;
  isOpen: boolean;
  onOpen: (hotelId: number, id?: number) => void;
  onClose: () => void;
}

export const useAddRooms = create<RoomState>((set) => ({
  id: undefined,
  hotelId: 0,
  isOpen: false,
  onOpen: (hotelId: number) => set({ isOpen: true, hotelId }),
  onClose: () => set({ isOpen: false, id: 0 }),
}));

// Abrir formulario editar habitaciones
export const useEditRooms = create<RoomState>((set) => ({
  id: undefined,
  hotelId: 0,
  isOpen: false,
  onOpen: (hotelId: number, id?: number) => set({ isOpen: true, hotelId, id }),
  onClose: () => set({ isOpen: false, id: undefined, hotelId: 0 }),
}));

// Obtener habitaciones
export const useRooms = (hotelId: number, id?: number) => {
  const queryClient = useQueryClient();

  const getRoomsQuery = useQuery({
    queryKey: ["rooms", { hotelId }],
    queryFn: async () => {
      const { data } = await getRooms(hotelId);
      return data;
    },
    enabled: true
  });

  // Obtener una habitación
  const getRoomQuery = useQuery({
    queryKey: ["room", { hotelId, id }],
    queryFn: async () => {
      if (!id) throw new Error("Room ID is required");
      try {
        const { data } = await getRoom(hotelId, id);
        if (!data) {
          throw new Error('No se recibieron datos de las habitaciones');
        }
        return data;
      } catch (error) {
        console.error('Error al obtener datos de las habitaciones:', error);
        throw error;
      }
    },
    enabled: !!id,
  });

  // Crear habitaciones
  const createRoomMutation = useMutation({
    mutationFn: async (values: object) => {
      const { data } = await createRoom(hotelId, values);
      return data;
    },
    onSuccess: () => {
      toast.success('Room creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['rooms', { hotelId }] });
      queryClient.invalidateQueries({ queryKey: ['hotel', { hotelId }] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al crear el Room');
    },    
  });

  const updateRoomMutation = useMutation({
    mutationFn: async (values: object) => {
      if (!id) throw new Error("Room ID is required");
      const { data } = await updateRoom(hotelId, id, values);
      return data;
    },
    onSuccess: () => {
      toast.success('Room actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['room', { hotelId, id }] });
      queryClient.invalidateQueries({ queryKey: ['hotel', { hotelId }] });
      queryClient.invalidateQueries({ queryKey: ['rooms', { hotelId }] });
    },
    onError: (error) => {
      console.error(error);
      toast.error('Error al actualizar el Room');
    }
  });

  return {
    getRoomsQuery,
    getRoomQuery,
    createRoomMutation,
    updateRoomMutation,
  };
}