import type { ClientFormData, CreateClientResult } from '../../../../utils/commonInterface';
import { getAuthToken } from '@/common/utils/auth';

export const createClientWithServiceLayer = async (
  clientData: ClientFormData
): Promise<CreateClientResult> => {
  try {
    // Obtener token de las cookies
    const token = getAuthToken();
    
    if (!token) {
      return {
        success: false,
        error: 'No hay token de autenticación. Por favor, inicia sesión primero.'
      };
    }


    throw new Error('Esta función debe ser reemplazada por el uso del hook useService en el componente');
    
  } catch (error: any) {
    const errorMessage = error.message || 'Error desconocido';
    return {
      success: false,
      error: `Error de conexión: ${errorMessage}`
    };
  }
};

export const processCreateClientResponse = (response: any): CreateClientResult => {
  if (response.data?.success) {
    return {
      success: true,
      client: response.data.client,
      jwt: response.data.jwt
    };
  } else if (response.status === 409) {
    return {
      success: false,
      error: 'Cliente ya existe con esos datos (email, CIF/NIF/NIE duplicado)'
    };
  } else if (response.status === 400) {
    const errorMsg = response.data?.error || 'Datos de entrada no válidos';
    return {
      success: false,
      error: `Datos inválidos: ${errorMsg}`
    };
  } else if (response.status === 500) {
    return {
      success: false,
      error: 'Error interno del servidor. Inténtalo de nuevo.'
    };
  } else {
    return {
      success: false,
      error: response.data?.error || `Error inesperado: ${response.status || 'Desconocido'}`
    };
  }
};