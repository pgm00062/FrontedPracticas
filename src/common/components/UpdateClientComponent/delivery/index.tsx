'use client'

import { useState } from 'react';
import {getClientById, updateClientById} from '../infrastructure/updateClientOperations';
import type { ClientUpadateData, UpdateClientState } from './interface';
import SearchAndUpdateForm from './components/SearchAndUpdateForm';
import ClientEditView from './components/ClientEditView';

const UpdateClientComponent: React.FC = () => {
  const [state, setState] = useState<UpdateClientState>({
    searchId: '',
    isSearching: false,
    currentClient: null,
    updatedClient: null,
    isUpdating: false,
    logs: [],
    result: null
  });

  const addLog = (message: string) => {
    setState(prev => ({
      ...prev,
      logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  };

  // ✅ PASO 1: Buscar cliente por ID
  const handleSearch = async () => {
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
      result: null
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

  // ✅ LOG PARA DEBUG - ver el estado actual
  console.log('🔍 Estado actual:', state);

  return (
    <div className="space-y-6">
      {/* ✅ COMPONENTE 1: Búsqueda */}
      <SearchAndUpdateForm
        searchId={state.searchId}
        isSearching={state.isSearching}
        currentClient={state.currentClient}
        onSearchIdChange={handleSearchIdChange}
        onSearch={handleSearch}
        onKeyPress={handleKeyPress}
      />

      {/* ✅ COMPONENTE 2: Edición (split view) */}
      {state.currentClient && state.updatedClient && (
        <ClientEditView
          currentClient={state.currentClient}
          updatedClient={state.updatedClient}
          isUpdating={state.isUpdating}
          onInputChange={handleInputChange}
          onUpdate={handleUpdate}
          onReset={handleReset}
        />
      )}

      {/* Estado de debug */}
      {state.currentClient && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-sm font-medium text-yellow-800">
            🐛 Debug: Cliente cargado - {state.currentClient.name} {state.currentClient.surname}
          </p>
        </div>
      )}

      {/* ... resto de componentes (resultado, logs) ... */}
    </div>
  );
};

export default UpdateClientComponent;