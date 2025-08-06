import type { ClientData } from '../../../../utils/commonInterface';
import { cookies } from 'next/headers';
import Service from '@/service/src';

// Función principal para buscar cliente por nombre parcial 
export const searchClientByNameServer = async (
  name: string
): Promise<ClientData[]> => {
  try {
    const token = cookies().get('authToken')?.value;
    if (!token) {
      console.log('No se encontró token en cookies');
      return [];
    }

    const response: any = await Service.getCases('getClientByName', {
      signal: undefined,
      endPointData: name,
      token,
    });

    // Si la respuesta es un objeto con .data, úsalo; si es un array, devuélvelo directamente
    if (Array.isArray(response)) {
      return response as ClientData[];
    }
    if (response?.data && Array.isArray(response.data)) {
      return response.data as ClientData[];
    }
    return [];
  } catch (error) {
    console.error('Error buscando cliente por nombre:', error);
    return [];
  }
};