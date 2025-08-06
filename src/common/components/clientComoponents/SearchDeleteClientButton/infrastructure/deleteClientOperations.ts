import Service from '@/service/src';

export const deleteClientById = async (
  id: string,
  token: string | undefined,
  onLog: (message: string) => void  
): Promise<{ success: boolean; error?: string }> => {
  onLog(`🗑️ Eliminando cliente con ID: ${id}`);

  try {

    if(!token) {
      onLog('❌ No se encontró token de autenticación');
      return { success: false, error: 'Token de autenticación requerido' };
    }

    // 🗑️ Eliminar cliente
    onLog(`🗑️ Enviando DELETE a: /clients/${id}`);

    const response: any = await Service.getCases('deleteClient', {
      signal: undefined,
      endPointData: { id },  
      body: null,            
      token,
    });

    onLog(`📡 Respuesta del servidor: ${response.status} - ${response.statusText}`);

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