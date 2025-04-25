import { http } from '@/api/http';

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