'use client';

import React, { useState } from 'react';
import type {ClientFormData, CreateClientResult } from './interface';
import { 
  DEFAULT_CLIENT_DATA, generateRandomClient, validateClientData, transformClientForCreation 
} from '../infrastructure/clientDataOperations';
import { createLogEntry, getLogClassName } from '../infrastructure/logOperations';
import { createClientWithJWT } from '../infrastructure/clientCreationOperations';

import ClientFormFields from './components/clientFormFields';
import FormActions from './components/formActions';
import ResultDisplay from './components/resultDisplay';
import LogDisplay from './components/logDisplay';

const CreateClientForm: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [lastResult, setLastResult] = useState<CreateClientResult | null>(null);
  const [clientData, setClientData] = useState<ClientFormData>(DEFAULT_CLIENT_DATA);

  // Añade mensajes al log usando la función de infrastructure
  const addLog = (message: string) => {
    const logEntry = createLogEntry(message);
    setLogs(prev => [...prev, logEntry]);
  };

  const clearResults = () => {
    setLogs([]);
    setLastResult(null);
  };                           

  const handleGenerateRandomClient  = () => {
    setClientData(generateRandomClient());
    clearResults();
  };

  const handleInputChange = (field: string, value: string | number) => {
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
    setLastResult(null);
  };

  const isFormValid = () => {
    return validateClientData(clientData);
  };

  // ✅ Función principal simplificada usando infrastructure
  const createClient = async () => {
    setIsCreating(true);
    clearResults();

    try {
      const result = await createClientWithJWT(clientData, addLog);
      setLastResult(result);
    } catch (error: any) {
      addLog(`❌ Error inesperado: ${error.message}`);
      setLastResult({ success: false, error: error.message });
    } finally {
      setIsCreating(false);
      addLog('🏁 Proceso completado');
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Crear Nuevo Cliente</h2>
      
      <div className="space-y-6">
        {/* ✅ Subcomponente: Campos del formulario */}
        <ClientFormFields
          clientData={clientData}
          onInputChange={handleInputChange}
          onGenerateRandom={handleGenerateRandomClient}
          isDisabled={isCreating}
        />

        {/* ✅ Subcomponente: Botones y acciones */}
        <FormActions
          onCreateClient={createClient}
          isCreating={isCreating}
          isFormValid={isFormValid()}
        />

        {/* ✅ Subcomponente: Mostrar resultados */}
        <ResultDisplay result={lastResult} />

        {/* ✅ Subcomponente: Mostrar logs */}
        <LogDisplay logs={logs} />
      </div>
    </div>
  );
};

export default CreateClientForm;
