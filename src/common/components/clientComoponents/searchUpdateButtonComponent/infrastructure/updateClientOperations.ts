import Service from '@/service/src';

export const updateClientById = async (
  id: string,
  clientData: any,
  token: string | undefined,
  onLog: (message: string) => void
): Promise<{ success: boolean; data?: any; error?: string }> => {
  onLog(`🔄 Actualizando cliente ID: ${id}`);

  try {
    if (!token) {
      onLog('❌ No se encontró token de autenticación');
      return { success: false, error: 'Token de autenticación requerido' };
    }

    // 📊 Preparar datos para actualización (incluir ID para la URL)
    const updateData = {
      id: id,  // <- Incluir ID para que la query pueda construir la URL
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
    const response: any = await Service.getCases('updateClient', {
      signal: undefined,
      endPointData: updateData,  
      body: updateData,          
      token,
    });

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