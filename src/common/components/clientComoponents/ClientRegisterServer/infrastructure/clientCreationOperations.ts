import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientFormData, CreateClientResult } from '../../../../utils/commonInterface';

// Función para transformar datos del formulario de registro
const transformRegisterDataForCreation = (data: any) => {
  return {
    name: data.nombre,
    surname: data.apellidos,
    email: data.email,
    phone: `+${data.telefono}`,
    cifNifNie: data.dni,
    age: data.edad.toString(),
    password: data.password,
    status: 'ACTIVE' as const,
  };
};

// Función para generar JWT
export const generateJWTForCreation = async (clientData: ClientFormData): Promise<string> => {
    const response = await clientServiceClient.post('/api/auth/generate-token-client', clientData);
    return response.data.token;
};

// Función principal para crear cliente
export const createClientRegister = async (
  clientData: any
): Promise<CreateClientResult> => {
  try {
    // Transformar datos para creación
    const clientDataForCreation = transformRegisterDataForCreation(clientData);

    // Generar JWT
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', clientDataForCreation);
    const jwt = jwtResponse.data.token;

    // Crear cliente
    const createResponse = await clientServiceClient.post('/clients/register', clientDataForCreation, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      },
      timeout: 10000,
      validateStatus: () => true
    });

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