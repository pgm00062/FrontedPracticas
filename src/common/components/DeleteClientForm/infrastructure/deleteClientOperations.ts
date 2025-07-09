import { clientServiceClient } from '@/common/utils/httpClient';
import { API_ENDPOINTS } from '@/common/utils/apiConfig';

export const DEFAULT_JWT_CLIENT_DATA = {
  name: 'Debug Cliente',
  surname: 'Test',
  age: 30,
  cifNifNie: '12345678A',
  email: 'debug@test.com',
  phone: '123456789',
  merchantType: null
};

export const getClientById = async (
  id: string,
  onLog: (message: string) => void
): Promise<{ success: boolean; data?: any; error?: string }> => {
  onLog(`🔍 Buscando cliente con ID: ${id}`);

  try {
    // 🔑 Generar JWT con datos válidos
    onLog('🔑 Generando JWT para búsqueda...');
    
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', DEFAULT_JWT_CLIENT_DATA);
    
    if (jwtResponse.status !== 200) {
      onLog(`❌ Error generando JWT: ${jwtResponse.status}`);
      return { success: false, error: `Error generando JWT: ${jwtResponse.status}` };
    }

    const jwt = jwtResponse.data.token;
    onLog(`✅ JWT generado correctamente`);

    // 🔍 Buscar cliente
    onLog(`🔍 Consultando endpoint: GET /clients/${id}`);
    
    const response = await clientServiceClient.get(
      API_ENDPOINTS.CLIENTS.GET_BY_ID(id),
      {
        headers: { 
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000,
        validateStatus: () => true
      }
    );

    onLog(`📡 Respuesta del servidor: ${response.status} - ${response.statusText}`);

    if (response.status === 200) {
      onLog(`✅ Cliente encontrado exitosamente`);
      onLog(`👤 Datos: ${JSON.stringify(response.data, null, 2)}`);
      return { success: true, data: response.data };
    } else if (response.status === 404) {
      onLog(`❌ Cliente no encontrado con ID: ${id}`);
      return { success: false, error: `Cliente no encontrado con ID: ${id}` };
    } else if (response.status === 400) {
      onLog(`❌ Bad Request (400) - Datos inválidos o ID mal formateado`);
      onLog(`📋 Respuesta del servidor: ${JSON.stringify(response.data, null, 2)}`);
      return { success: false, error: `ID inválido o datos mal formateados: ${response.data?.message || 'Bad Request'}` };
    } else if (response.status === 401) {
      onLog(`❌ No autorizado (401) - JWT inválido`);
      return { success: false, error: 'Token JWT inválido o expirado' };
    } else {
      onLog(`❌ Error del servidor: ${response.status} - ${response.statusText}`);
      onLog(`📋 Respuesta: ${JSON.stringify(response.data, null, 2)}`);
      return { success: false, error: `Error del servidor: ${response.status}` };
    }

  } catch (error: any) {
    onLog(`❌ Error de conexión: ${error.message}`);
    
    if (error.response) {
      onLog(`📡 Status: ${error.response.status}`);
      onLog(`📋 Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    
    return { success: false, error: `Error de conexión: ${error.message}` };
  }
};

// ✅ FUNCIÓN CORREGIDA: deleteClientById
export const deleteClientById = async (
  id: string,
  onLog: (message: string) => void  // ✅ CORREGIDO: No necesita clientData
): Promise<{ success: boolean; error?: string }> => {
  onLog(`🗑️ Eliminando cliente con ID: ${id}`);

  try {
    // 🔑 Generar JWT para eliminación
    onLog('🔑 Generando JWT para eliminación...');

    // ✅ CORREGIDO: Usar DEFAULT_JWT_CLIENT_DATA
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', DEFAULT_JWT_CLIENT_DATA);
    
    if (jwtResponse.status !== 200) {
      onLog(`❌ Error generando JWT: ${jwtResponse.status}`);
      return { success: false, error: `Error generando JWT: ${jwtResponse.status}` };
    }

    const jwt = jwtResponse.data.token;
    onLog(`✅ JWT generado correctamente`);

    // 🗑️ Eliminar cliente
    onLog(`🗑️ Enviando DELETE a: /clients/${id}`);

    const response = await clientServiceClient.delete(
      API_ENDPOINTS.CLIENTS.DELETE(id),
      {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000,
        validateStatus: () => true
      }
    );

    onLog(`📡 Respuesta del servidor: ${response.status} - ${response.statusText}`);

    // ✅ CORREGIDO: Estructura if-else correcta
    if (response.status === 204) {
      onLog(`✅ Cliente eliminado exitosamente`);
      return { success: true };
    } else if (response.status === 404) {
      onLog(`❌ Cliente no encontrado con ID: ${id}`);
      return { success: false, error: `Cliente no encontrado con ID: ${id}` };
    } else if (response.status === 400) {
      onLog(`❌ Bad Request (400) - Datos inválidos o ID mal formateado`);
      onLog(`📋 Respuesta del servidor: ${JSON.stringify(response.data, null, 2)}`);
      return { success: false, error: `ID inválido o datos mal formateados: ${response.data?.message || 'Bad Request'}` };
    } else if (response.status === 401) {
      onLog(`❌ No autorizado (401) - JWT inválido`);
      return { success: false, error: 'Token JWT inválido o expirado' };
    } else {
      onLog(`❌ Error del servidor: ${response.status} - ${response.statusText}`);
      onLog(`📋 Respuesta: ${JSON.stringify(response.data, null, 2)}`);
      return { success: false, error: `Error del servidor: ${response.status}` };
    }

  } catch (error: any) {
    onLog(`❌ Error de conexión en eliminación: ${error.message}`);
    
    if (error.response) {
      onLog(`📡 Status: ${error.response.status}`);
      onLog(`📋 Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    
    return { success: false, error: `Error de conexión: ${error.message}` };
  }
};