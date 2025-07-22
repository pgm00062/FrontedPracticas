import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientData, JWTClientData } from '../../../../utils/commonInterface';

// Datos por defecto para generar JWT
const DEFAULT_JWT_CLIENT_DATA: JWTClientData = {
    name: 'Debug Cliente',
    surname: 'Test',
    age: 30,
    cifNifNie: '12345678A',
    email: 'debug@test.com',
    phone: '123456789',
    merchantType: null
};

// Resultado de la búsqueda
export interface SearchResult {
    success: boolean;
    data?: ClientData;
    error?: string;
    statusCode?: number;
}

// Función para generar JWT
export const generateJWTForSearch = async (clientData: JWTClientData): Promise<string> => {
    const response = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    return response.data.token;
};

// Función principal para buscar cliente por ID
export const searchClientByIdServer = async (
  clientId: string
): Promise<ClientData | null> => {
  try {
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', DEFAULT_JWT_CLIENT_DATA);
    const jwt = jwtResponse.data.token;

    const response = await clientServiceClient.get(`/clients/${clientId}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      validateStatus: () => true
    });

    if (response.status === 200) {
      return response.data as ClientData;
    }
    return null;
  } catch {
    return null;
  }
};