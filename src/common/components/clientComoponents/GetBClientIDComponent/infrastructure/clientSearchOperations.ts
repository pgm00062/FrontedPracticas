import type { ClientData } from '../../../../utils/commonInterface';
import Service from '@/service/src';
import { cookies } from 'next/headers';

export const searchClientByIdServer = async (
  clientId: string
): Promise<ClientData | null> => {
  try {
    const token = cookies().get('authToken')?.value; 
    console.log('Token encontrado:', !!token);
    console.log('Token value:', token?.substring(0, 20) + '...'); 
    console.log('ClientId a buscar:', clientId);
    
    if (!token) {
      console.log('No se encontró token en cookies');
      return null;
    }

    const response: any = await Service.getCases('getClientById', {
      signal: undefined,
      endPointData: clientId, 
      token,
    });

    console.log('Respuesta del servicio:', response);
    
    if (response?.data) {
      return response.data as ClientData;
    }
    
    return null;
  } catch (err) {
    console.error('Error buscando cliente:', err);
    return null;
  }
};