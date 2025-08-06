import { cookies } from 'next/headers';
import Service from '@/service/src';
import type { ClientData} from '../../../../utils/commonInterface';

// Función principal para buscar cliente por ID
export const searchClientByEmailServer = async (
  email: string
): Promise<ClientData | null> => {
  try {

    const token= cookies().get('authToken')?.value; 

    console.log('Token encontrado:', !!token);
    console.log('Token value:', token?.substring(0, 20) + '...'); // Solo mostrar inicio del token
    console.log('ClientId a buscar:', email);

    if(!token) { 
      console.log('No se encontró token en cookies');
      return null;
    }
    const response: any = await Service.getCases('getClientByEmail', {
      signal: undefined,
      endPointData: email, // Pasa directamente el email
      token,
    });

    console.log('Respuesta del servicio:', response);

    if (response?.data) {
      return response.data as ClientData;
    }

    if (response.status === 200) {
      return response.data as ClientData;
    }
    return null;
  } catch {
    return null;
  }
};