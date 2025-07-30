'use client';
import React, { useState } from 'react';
import type { ClientFormData, CreateClientResult } from '../../../utils/commonInterface';
import { DEFAULT_CLIENT_DATA, generateRandomClient, validateClientData } from './infrastructure/clientDataOperations';
import { toast } from 'sonner';
import { Button, Spin, Skeleton } from 'antd';

import ClientFormFields from './components/clientFormFields';
import ResultDisplay from './components/resultDisplay';
import LogDisplay from './components/logDisplay';

const CreateClientForm: React.FC = () => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [lastResult, setLastResult] = useState<CreateClientResult | null>(null);
  const [clientData, setClientData] = useState<ClientFormData>(DEFAULT_CLIENT_DATA);

  const handleInputChange = (field: keyof ClientFormData, value: string | number) => {
    setClientData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerateRandomClient = () => {
    setClientData(generateRandomClient());
  };

  const isFormValid = () => validateClientData(clientData);

  const createClient = async () => {
    setIsCreating(true);
    const response = await fetch('/api/create-client', {
      method: 'POST',
      body: JSON.stringify(clientData),
      headers: { 'Content-Type': 'application/json' }
    });
    const result: CreateClientResult = await response.json();
    setLastResult(result);
    setIsCreating(false);

    if (!result.success) {
      toast.error(result.error || '❌ Error desconocido al crear cliente');
    } else {
      toast.success('Cliente creado correctamente');
    }
  };

  return (
    <div className="card" style={{ position: 'relative' }}>
      <h2 className="text-xl font-semibold mb-4 text-gray-800">👤 Crear Nuevo Cliente</h2>
      {/* Overlay de carga */}
      {isCreating && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.6)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Spin size="large" tip="Creando cliente..." />
        </div>
      )}
      <div className="space-y-6" style={{ opacity: isCreating ? 0.5 : 1 }}>
        <ClientFormFields
          clientData={clientData}
          onInputChange={handleInputChange}
          onGenerateRandom={handleGenerateRandomClient}
          isDisabled={isCreating}
        />
        {/* Botón con Spinner y deshabilitado */}
        <Button
          type="primary"
          disabled={!isFormValid() || isCreating}
          onClick={createClient}
          block
        >
          {isCreating ? <Spin size="small" /> : 'Crear Cliente'}
        </Button>
        {/* Skeleton en el resultado */}
        {isCreating ? (
          <Skeleton active paragraph={{ rows: 1 }} /> 
        ) : (
          <ResultDisplay result={lastResult} />
        )}
        <LogDisplay logs={logs} />
      </div>
    </div>
  );
};
export default CreateClientForm;