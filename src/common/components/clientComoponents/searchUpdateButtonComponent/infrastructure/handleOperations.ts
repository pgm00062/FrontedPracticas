import { useState } from 'react';
import {updateClientById} from '../infrastructure/updateClientOperations';
import type { ClientFormData, ClientUpdateData, UpdateClientState } from '../delivery/interface';
import { toast } from 'sonner';

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
  const handleUpdate = async () => {

      setState(prev => ({ 
          ...prev, 
          isUpdating: true,
          showInstructions: false  // ✅ OCULTAR AQUÍ
      }));

    if (!state.updatedClient) {
      toast.error('❌ No hay datos para actualizar');
      addLog('❌ No hay datos para actualizar');
      return;
    }

    setState(prev => ({ ...prev, isUpdating: true }));

    try {
      const result = await updateClientById(
        state.updatedClient.id,
        state.updatedClient,
        addLog
      );

      setState(prev => ({
        ...prev,
        result,
        isUpdating: false
      }));

      if (result.success) {
        // Actualizar datos actuales con los nuevos
        setState(prev => ({
          ...prev,
          currentClient: result.data
        }));
        toast.success('✅ Cliente actualizado exitosamente');
        addLog('✅ Cliente actualizado exitosamente en la interfaz');
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
        addLog
    };
}
    