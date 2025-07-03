'use client';

import React, { useState } from 'react';
import type {ClientFormData, CreateClientResult } from './delivery/interface';
import { 
  DEFAULT_CLIENT_DATA, generateRandomClient, validateClientData, transformClientForCreation 
} from './infrastructure/clientDataOperations';
import { createLogEntry, getLogClassName } from './infrastructure/logOperations';
import { createClientWithJWT } from './infrastructure/clientCreationOperations';

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
        {/* Formulario */}
        <div>
        
          <div className="flex gap-2 mb-4">
            <button
              onClick={handleGenerateRandomClient}
              className="btn-secondary"
            >
              🎲 Generar Datos Aleatorios
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  id="name"
                  type="text"
                  value={clientData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Juan"
                />
              </div>
              
              <div>
                <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">
                  Apellido *
                </label>
                <input
                  id="surname"
                  type="text"
                  value={clientData.surname}
                  onChange={(e) => handleInputChange('surname', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: Pérez"
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  id="email"
                  type="email"
                  value={clientData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: juan.perez@email.com"
                />
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono *
                </label>
                <input
                  id="phone"
                  type="text"
                  value={clientData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 123456789"
                />
              </div>
              
              <div>
                <label htmlFor="cifNifNie" className="block text-sm font-medium text-gray-700 mb-1">
                  CIF/NIF/NIE *
                </label>
                <input
                  id="cifNifNie"
                  type="text"
                  value={clientData.cifNifNie}
                  onChange={(e) => handleInputChange('cifNifNie', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 12345678A"
                />
              </div>
              
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                  Edad *
                </label>
                <input
                  id="age"
                  type="number"
                  min="18"
                  max="120"
                  value={clientData.age}
                  onChange={(e) => handleInputChange('age', parseInt(e.target.value) || 18)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 30"
                />
              </div>
            </div>
            
            <div className="text-xs text-gray-600">
              * Campos requeridos
            </div>
          </div>
        </div>

        {/* Botón */}
        <button
          onClick={createClient}
          disabled={isCreating || !isFormValid()}
          className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
            isCreating || !isFormValid()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isCreating ? '⏳ Creando cliente...' : '🚀 Crear Cliente'}
        </button>

        {/* Validación */}
        {!isFormValid() && (
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
            <p className="text-yellow-800 text-sm">
              ⚠️ Completa todos los campos requeridos
            </p>
          </div>
        )}

        {/* Resultados */}
        {lastResult && lastResult.success && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <h3 className="text-green-800 font-medium mb-2">✅ Cliente creado exitosamente</h3>
            
            <div className="mb-3">
              <p className="text-sm font-medium text-green-700 mb-1">JWT generado:</p>
              <div className="bg-green-100 p-2 rounded text-xs font-mono break-all text-green-600">
                {lastResult.jwt}
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-green-700 mb-1">Cliente creado:</p>
              <pre className="text-sm text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
                {JSON.stringify(lastResult.client, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {lastResult && !lastResult.success && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-md">
            <h3 className="text-red-800 font-medium mb-2">❌ Error al crear cliente</h3>
            <p className="text-red-700 text-sm">
              {lastResult.error}
            </p>
          </div>
        )}

        {/* Logs */}
        {logs.length > 0 && (
          <details className="bg-gray-50 p-3 rounded-md">
            <summary className="cursor-pointer text-sm font-medium text-gray-700">
              📋 Ver logs detallados ({logs.length} entradas)
            </summary>
            <div className="bg-gray-900 text-green-400 p-4 rounded-md font-mono text-xs overflow-x-auto max-h-60 overflow-y-auto mt-2">
              {logs.map((log, index) => (
                <div key={`log-${Date.now()}-${index}`} className="mb-1">
                  {log}
                </div>
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  );
};

export default CreateClientForm;
