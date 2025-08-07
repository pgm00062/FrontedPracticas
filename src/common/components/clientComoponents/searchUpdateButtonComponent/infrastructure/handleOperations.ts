import { useState } from 'react';
import {updateClientById} from '../infrastructure/updateClientOperations';
import type { ClientFormData, ClientUpdateData, UpdateClientState } from '../delivery/interface';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { message } from 'antd';

export const handleOperations = () => {
    const [state, setState] = useState<UpdateClientState>({
    searchId: '',
    isSearching: false,
    currentClient: null,
    updatedClient: null,
    isUpdating: false,
    logs: [],
    result: null,
    showInstructions: true,
  });

  const initializeUpdateClient = (client: ClientUpdateData) => {
    setState(prev => ({
      ...prev,
      updatedClient: { ...client }
    }));
  };

  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  // ✅ PASO 2: Actualizar datos del cliente
  const handleUpdate = async (onSuccess?: () => void) => {
    setState(prev => ({
      ...prev,
      isUpdating: true,
      showInstructions: false
    }));

    if (!state.updatedClient) {
      toast.error('❌ No hay datos para actualizar');
      addLog('❌ No hay datos para actualizar');
      return;
    }

    console.log('Datos a actualizar:', state.updatedClient);

    try {
      const token = Cookies.get('authToken');
      const result = await updateClientById(
        state.updatedClient.id,
        state.updatedClient,
        token,
        addLog
      );

      console.log('Resultado actualización:', result);
      console.log('Token:', token);
      setState(prev => ({
        ...prev,
        result,
        isUpdating: false
      }));

      if (result.success) {
        setState(prev => ({
          ...prev,
          currentClient: result.data
        }));
        addLog('✅ Cliente actualizado exitosamente en la interfaz');
        if (onSuccess) onSuccess(); // <-- Ejecuta el callback
      }

    } catch (error) {
      toast.error(`❌ Error al actualizar cliente: ${error}`);
      addLog(`❌ Error: ${error}`);
      setState(prev => ({ ...prev, isUpdating: false }));
    }
  };

  // ✅ Manejar cambios en campos editables
  const handleInputChange = (field: keyof ClientFormData, value: string | number) => {
    setState(prev => ({
      ...prev,
      updatedClient: prev.updatedClient ? {
        ...prev.updatedClient,
        [field]: value
      } : null
    }));
  };

  // ✅ Resetear formulario
  const handleReset = () => {
    setState({
      searchId: '',
      isSearching: false,
      currentClient: null,
      updatedClient: null,
      isUpdating: false,
      logs: [],
      result: null,
      showInstructions: true,
    });
  };

    // ✅ Handlers para el componente SearchAndUpdateForm
  const handleSearchIdChange = (value: string) => {
    setState(prev => ({ ...prev, searchId: value }));
  };
 

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  };
    return {
        state,
        handleUpdate,
        handleInputChange,
        initializeUpdateClient,
        handleReset,
        handleSearchIdChange,
        handleKeyPress,
        addLog,
    };
}