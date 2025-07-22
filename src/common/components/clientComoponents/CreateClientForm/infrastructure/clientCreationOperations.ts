import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientFormData, CreateClientResult } from '../../../../utils/commonInterface';
import { transformClientForCreation } from './clientDataOperations';

// Función para generar JWT
export const generateJWTForCreation = async (clientData: ClientFormData): Promise<string> => {
    const response = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    return response.data.token;
};

// Función principal para crear cliente
export const createClientWithJWTServer = async (
  clientData: ClientFormData
): Promise<CreateClientResult> => {
  try {
    // Generar JWT
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    const jwt = jwtResponse.data.token;

    // Transformar datos para creación
    const clientDataForCreation = transformClientForCreation(clientData);

    // Crear cliente
    const createResponse = await clientServiceClient.post('/clients', clientDataForCreation, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      validateStatus: () => true
    });ss

    if (createResponse.status === 201) {
      return {
        success: true,
        client: createResponse.data,
        jwt: jwt
      };
    } else if (createResponse.status === 409) {
      return {
        success: false,
        error: 'Cliente ya existe con esos datos (email, CIF/NIF/NIE duplicado)'
      };
    } else if (createResponse.status === 400) {
      const errorMsg = createResponse.data?.error || 'Datos de entrada no válidos';
      return {
        success: false,
        error: `Datos inválidos: ${errorMsg}`
      };
    } else if (createResponse.status === 500) {
      return {
        success: false,
        error: 'Error interno del servidor. Inténtalo de nuevo.'
      };
    } else {
      return {
        success: false,
        error: `Error inesperado: ${createResponse.status}`
      };
    }
  } catch (error: any) {
    const errorMessage = error.message || 'Error desconocido';
    return {
      success: false,
      error: `Error de conexión: ${errorMessage}`
    };
  }
};