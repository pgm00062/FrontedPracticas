import { clientServiceClient } from '@/common/utils/httpClient';
import type { LoginFormData, LoginResult } from '../../../../utils/commonInterface';

const validateLoginData = (data: LoginFormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
    errors.push('El email no es válido');
  }
  if (!data.password || data.password.length < 6) {
    errors.push('La contraseña debe tener al menos 6 caracteres');
  }
  return {
    isValid: errors.length === 0,
    errors
  };
};

export const clientLogin = async (
  loginData: LoginFormData
): Promise<LoginResult> => {
  try {
    // Validar datos del formulario
    const validation = validateLoginData(loginData);
    if (!validation.isValid) {
      return {
        success: false,
        error: `Datos inválidos: ${validation.errors.join(', ')}`
      };
    }

    const loginPayload = {
      email: loginData.email.toLowerCase().trim(),
      password: loginData.password,
    };

    const loginResponse = await clientServiceClient.post('/clients/login', loginPayload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000,
      validateStatus: () => true
    });

    if (loginResponse.status === 200) {
      return {
        success: true,
        client: loginResponse.data.client || loginResponse.data,
        jwt: loginResponse.data.token || loginResponse.data.jwt
      };
    } else if (loginResponse.status === 401) {
      return {
        success: false,
        error: 'Email o contraseña incorrectos'
      };
    } else if (loginResponse.status === 404) {
      return {
        success: false,
        error: 'No existe una cuenta con este email'
      };
    } else if (loginResponse.status === 400) {
      const errorMsg = loginResponse.data?.error || loginResponse.data?.message || 'Datos de entrada no válidos';
      return {
        success: false,
        error: `Datos inválidos: ${errorMsg}`
      };
    } else if (loginResponse.status === 500) {
      return {
        success: false,
        error: 'Error interno del servidor. Inténtalo de nuevo.'
      };
    } else {
      return {
        success: false,
        error: `Error inesperado: ${loginResponse.status} - ${loginResponse.statusText}`
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
      return {
        success: false,
        error: `Error de configuración: ${error.message}`
      };
    }
  }
};
