import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientData, JWTClientData } from '../../../../utils/commonInterface';

const DEFAULT_JWT_CLIENT_DATA: JWTClientData = {
    name: 'Debug Cliente',
    surname: 'Test',
    age: 30,
    cifNifNie: '12345678A',
    email: 'debug@test.com',
    phone: '123456789',
    merchantType: null
};

// Función principal para buscar cliente por nombre parcial (sin logs, para Server Component)
export const searchClientByNameServer = async (
  name: string
): Promise<ClientData[]> => {
  try {
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', DEFAULT_JWT_CLIENT_DATA);
    const jwt = jwtResponse.data.token;

    const response = await clientServiceClient.get(`/clients/name?name=${name}`, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      timeout: 5000,
      validateStatus: () => true
    });

    if (response.status === 200) {
      return response.data as ClientData[];
    }
    return [];
  } catch (error) {

    return [];
  } 
};

export const getRecentClientsServer = async (): Promise<ClientData[]> => {
  const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', DEFAULT_JWT_CLIENT_DATA);
  const jwt = jwtResponse.data.token;

  const response = await clientServiceClient.get('/clients/recent', {//IMPLEMENTAR EN EL BACKEND
    headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
    },
    timeout: 5000,
    validateStatus: () => true
  });

  if (response.status === 200) {
    return response.data as ClientData[];
  }
  return [];
};