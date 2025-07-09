import { useState } from 'react';
import {getClientById, updateClientById} from '../infrastructure/updateClientOperations';
import type { ClientUpadateData, UpdateClientState } from '../delivery/interface';

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

  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  // ✅ PASO 1: Buscar cliente por ID
  const handleSearch = async () => {
    setState(prev => ({ 
        ...prev, 
        isSearching: true,
        showInstructions: true  // ✅ MOSTRAR AQUÍ
    }));
    
    if (!state.searchId.trim()) {
      addLog('❌ Introduce un ID válido');
      return;  
    }

    setState(prev => ({ ...prev, isSearching: true, logs: [] }));

    try {
      const result = await getClientById(state.searchId.trim(), addLog);
      
      if (result.success && result.data) {
        // ✅ Cliente encontrado - preparar datos para edición
        addLog(`✅ Datos recibidos: ${JSON.stringify(result.data)}`); // ✅ LOG PARA DEBUG
        
        addLog(`🔍 ID: ${result.data.id}`);
        addLog(`🔍 Nombre: ${result.data.name}`);
        addLog(`🔍 Apellido: ${result.data.surname}`);
        addLog(`🔍 Email: ${result.data.email}`);

        setState(prev => ({
          ...prev,
          currentClient: result.data,
          updatedClient: { ...result.data }, // ✅ Copia para editar
          isSearching: false
        }));
        
        addLog(`✅ Estado actualizado - Cliente cargado para edición`);
      } else {
        setState(prev => ({
          ...prev,
          isSearching: false,
          currentClient: null,
          updatedClient: null
        }));
        addLog(`❌ No se encontró cliente: ${result.error}`);
      }
    } catch (error) {
      addLog(`❌ Error: ${error}`);
      setState(prev => ({ ...prev, isSearching: false }));
    }   
  };

  // ✅ PASO 2: Actualizar datos del cliente
  const handleUpdate = async () => {

      setState(prev => ({ 
          ...prev, 
          isUpdating: true,
          showInstructions: false  // ✅ OCULTAR AQUÍ
      }));

    if (!state.updatedClient) {
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
        addLog('✅ Cliente actualizado exitosamente en la interfaz');
      }

    } catch (error) {
      addLog(`❌ Error: ${error}`);
      setState(prev => ({ ...prev, isUpdating: false }));
    }
  };

  // ✅ Manejar cambios en campos editables
  const handleInputChange = (field: keyof ClientUpadateData, value: string | number) => {
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
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
    return {
        state,
        handleSearch,
        handleUpdate,
        handleInputChange,
        handleReset,
        handleSearchIdChange,
        handleKeyPress,
        addLog
    };
}
    