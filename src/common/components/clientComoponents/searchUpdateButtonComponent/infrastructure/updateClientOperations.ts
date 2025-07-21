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

export const updateClientById = async (
  id: string,
  clientData: any,
  onLog: (message: string) => void
): Promise<{ success: boolean; data?: any; error?: string }> => {
  onLog(`🔄 Actualizando cliente ID: ${id}`);

  try {
    // 🔑 Generar JWT
    onLog('🔑 Generando JWT para actualización...');
    
    const jwtResponse = await clientServiceClient.post('/api/auth/generate-token-client', DEFAULT_JWT_CLIENT_DATA);
    
    if (jwtResponse.status !== 200) {
      onLog(`❌ Error generando JWT: ${jwtResponse.status}`);
      return { success: false, error: `Error generando JWT: ${jwtResponse.status}` };
    }

    const jwt = jwtResponse.data.token;
    onLog(`✅ JWT generado para actualización`);

    // 📊 Preparar datos para actualización
    const updateData = {
      name: clientData.name,
      surname: clientData.surname,
      email: clientData.email,
      phone: clientData.phone,
      cifNifNie: clientData.cifNifNie,
      age: clientData.age
    };

    onLog(`📋 Datos a enviar: ${JSON.stringify(updateData, null, 2)}`);
    onLog(`🔄 Enviando PUT a: /clients/${id}`);

    // 🔄 Actualizar cliente
    const response = await clientServiceClient.put(
      API_ENDPOINTS.CLIENTS.UPDATE(id),
      updateData,
      {
        headers: { 
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        },
        timeout: 5000,
        validateStatus: () => true
      }
    );

    onLog(`📡 Respuesta actualización: ${response.status} - ${response.statusText}`);

    if (response.status === 200) {
      onLog(`✅ Cliente actualizado exitosamente`);
      onLog(`👤 Datos actualizados: ${JSON.stringify(response.data, null, 2)}`);
      return { success: true, data: response.data };
    } else if (response.status === 404) {
      onLog(`❌ Cliente no encontrado para actualizar: ${id}`);
      return { success: false, error: `Cliente no encontrado: ${id}` };
    } else if (response.status === 400) {
      onLog(`❌ Datos inválidos para actualización`);
      onLog(`📋 Error: ${JSON.stringify(response.data, null, 2)}`);
      return { success: false, error: `Datos inválidos: ${response.data?.message || 'Bad Request'}` };
    } else {
      onLog(`❌ Error actualizando: ${response.status}`);
      return { success: false, error: `Error: ${response.status}` };
    }

  } catch (error: any) {
    onLog(`❌ Error de conexión en actualización: ${error.message}`);
    
    if (error.response) {
      onLog(`📡 Status: ${error.response.status}`);
      onLog(`📋 Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    
    return { success: false, error: `Error de conexión: ${error.message}` };
  }
};