import { clientServiceClient } from '@/common/utils/httpClient';
import type { ClientFormData, CreateClientResult } from '../../../../utils/commonInterface';

// Interfaz para los datos del formulario de registro
interface RegisterFormData {
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  dni: string;
  edad: number;
  password: string;
}

// Función para validar datos del formulario
const validateRegisterData = (data: RegisterFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!data.nombre || data.nombre.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }
  
  if (!data.apellidos || data.apellidos.trim().length < 2) {
    errors.push('Los apellidos deben tener al menos 2 caracteres');
  }
  
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('El email no es válido');
  }
  
  if (!data.telefono || data.telefono.length < 9) {
    errors.push('El teléfono debe tener al menos 9 dígitos');
  }
  
  if (!data.dni || data.dni.length < 8) {
    errors.push('El DNI/CIF/NIE debe tener al menos 8 caracteres');
  }
  
  if (!data.edad || data.edad < 18 || data.edad > 120) {
    errors.push('La edad debe estar entre 18 y 120 años');
  }
  
  if (!data.password || data.password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};


// Función principal para crear cliente
export const createClientRegister = async (
  clientData: RegisterFormData
): Promise<CreateClientResult> => {
  try {
    const validation = validateRegisterData(clientData);
    if (!validation.isValid) {
      return {
        success: false,
        error: `Datos inválidos: ${validation.errors.join(', ')}`
      };
    }

    const baseClientData = {
      name: clientData.nombre.trim(),
      surname: clientData.apellidos.trim(),
      email: clientData.email.toLowerCase().trim(),
      cifNifNie: clientData.dni.toUpperCase().trim(),
      age: clientData.edad.toString(),
      password: clientData.password,
      phone: clientData.telefono.replace(/[\s\-()]/g, ''),
      status: 'ACTIVE' as const,
    };

    try {

      const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', baseClientData);
      const jwt = jwtResponse.data.token;

      const createResponse = await clientServiceClient.post('/clients/register', baseClientData, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        timeout: 15000,
        validateStatus: () => true
      });

      // Evaluar respuesta
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
        const errorMsg = createResponse.data?.error || createResponse.data?.message || 'Datos de entrada no válidos';
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
          error: `Error inesperado: ${createResponse.status} - ${createResponse.statusText}`
        };
      }
      
    } catch (jwtError: any) {
      return {
        success: false,
        error: `Error en autenticación: ${jwtError.response?.data?.error || jwtError.message}`
      };
    }

  } catch (error: any) {
    if (error.response) {
      return {
        success: false,
        error: `Error del servidor (${error.response.status}): ${error.response.data?.message || error.response.data?.error || error.response.statusText}`
      };
    } else if (error.request) {
      return {
        success: false,
        error: 'Error de conexión: No se pudo conectar con el servidor. Verifica tu conexión a internet.'
      };
    } else {
      console.error('⚙️ Error de configuración:', error.message);
      return {
        success: false,
        error: `Error de configuración: ${error.message}`
      };
    }
  }
};