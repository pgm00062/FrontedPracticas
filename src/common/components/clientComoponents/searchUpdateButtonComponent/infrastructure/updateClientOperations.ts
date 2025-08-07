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

    const updateData = {
      id: id,  
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

    if (response && response.id) {
      onLog(`✅ Cliente actualizado exitosamente (formato directo)`);
      onLog(`👤 Datos actualizados: ${JSON.stringify(response, null, 2)}`);
      return { success: true, data: response };
    }
    // Éxito si recibes el objeto cliente envuelto en { success, data }
    if (response && response.success && response.data && response.data.id) {
      onLog(`✅ Cliente actualizado exitosamente (formato envuelto)`);
      onLog(`👤 Datos actualizados: ${JSON.stringify(response.data, null, 2)}`);
      return { success: true, data: response.data };
    }
    // Si no se cumple ningún caso anterior, retorna error
    onLog(`❌ Respuesta inesperada del servidor: ${JSON.stringify(response, null, 2)}`);
    return { success: false, error: 'Respuesta inesperada del servidor' };

  } catch (error: any) {
    onLog(`❌ Error de conexión en actualización: ${error.message}`);
    onLog(`❌ Error completo: ${JSON.stringify(error, null, 2)}`); 

    if (error.response) {
      onLog(`📡 Status: ${error.response.status}`);
      onLog(`📋 Data: ${JSON.stringify(error.response.data, null, 2)}`);
    }
    return { success: false, error: `Error de conexión: ${error.message}` };
  }
};