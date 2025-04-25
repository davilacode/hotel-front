import { http } from '@/api/http';

// Hoteles
export const getHotels = async () => {
  return await http({
    url: '/hotels',
    method: 'GET',
  });
};

export const getHotel = async (id: number) => await http({
  url: `/hotels/${id}`,
  method: 'GET',
});

export const createHotel = async (data: object) => await http({
  url: '/hotels',
  method: 'POST',
  data,
});

export const updateHotel = async (id: number, data: object) => await http({
  url: `/hotels/${id}`,
  method: 'PUT',
  data,
});

// Habitaciones
export const getRooms = async (hotelId: number) => {
  return await http({
    url: `/hotels/${hotelId}/rooms`,
    method: 'GET',
  });
};

export const getRoom = async (hotelId: number, id: number) => await http({
  url: `/hotels/${hotelId}/rooms/${id}`,
  method: 'GET',
});

export const createRoom = async (hotelId: number, data: object) => await http({
  url: `/hotels/${hotelId}/rooms`,
  method: 'POST',
  data,
});

export const updateRoom = async (hotelId: number, id: number, data: object) => await http({
  url: `/hotels/${hotelId}/rooms/${id}`,
  method: 'PUT',
  data,
});