import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from 'sonner';
import { createHotel, getHotel, getHotels, updateHotel, deleteHotel } from "@/api/hotels";

import { create } from 'zustand';

type HotelState = {
  id?: number;
  isOpen: boolean;
  onOpen: (id?: number) => void;
  onClose: () => void;
}

export const useAddHotel = create<HotelState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));

// Abrir formulario editar hotel
export const useEditHotel = create<HotelState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));

// Abrir validación para eliminar hotel
export const useDeleteHotel = create<HotelState>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: number) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));
// Obtener todos los Hoteles
export const useHotels = (id?: number) => {
  const queryClient = useQueryClient();

  const getHotelsQuery = useQuery({
    queryKey: ["hotels"],
    queryFn: async () => {
      const { data } = await getHotels();
      return data;
    },
  });

  // Obtener un Hotel
  const getHotelQuery = useQuery({
    queryKey: ["hotel", { id }],
    queryFn: async () => {
      if (!id) throw new Error("Hotel ID is required");
      try {
        const { data } = await getHotel(id);
        if (!data) {
          throw new Error('No se recibieron datos del Hotel');
        }
        return data;
      } catch (error) {
        console.error('Error al obtener datos del Hotel:', error);
        throw error;
      }
    },
    enabled: !!id,
  });

  // Crear Hotel
  const createHotelMutation = useMutation({
    mutationFn: async (values: object) => {
      const { data } = await createHotel(values);
      return data;
    },
    onSuccess: () => {
      toast.success('Hotel creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error) => {
      console.error(error);
      const errorMessage = (error as any)?.response?.data?.message || 'Error desconocido';
      toast.error('Error al crear Hotel: ' + errorMessage);
    },    
  });

  const updateHotelMutation = useMutation({
    mutationFn: async (values: object) => {
      if (!id) throw new Error("Hotel ID is required");
      const { data } = await updateHotel(id, values);
      return data;
    },
    onSuccess: () => {
      toast.success('Hotel actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['hotel', { id }] });
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error) => {
      console.error(error);
      const errorMessage = (error as any)?.response?.data?.message || 'Error desconocido';
      toast.error('Error al actualizar el Hotel: ' + errorMessage);
    }
  });

  const deleteHotelMutation = useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("Hotel ID is required");
      const { data } = await deleteHotel(id);
      return data;
    },
    onSuccess: () => {
      toast.success('Hotel eliminado correctamente');
      queryClient.invalidateQueries({ queryKey: ['hotels'] });
    },
    onError: (error) => {
      console.error(error);
      const errorMessage = (error as any)?.response?.data?.message || 'Error desconocido';
      toast.error('Error al eliminar Hotel: ' + errorMessage);
    }
  });

  return {
    getHotelsQuery,
    getHotelQuery,
    createHotelMutation,
    updateHotelMutation,
    deleteHotelMutation
  };
}