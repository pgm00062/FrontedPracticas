'use client';

import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { API_ENDPOINTS } from '@/common/utils/apiConfig';
import { clientServiceClient, merchantServiceClient } from '@/common/utils/httpClient';

interface Props {
  scope?: 'all' | 'client' | 'merchant';
}

const fetchHealthStatus = async (service: 'client' | 'merchant') => {
  const response = service === 'client'
    ? await clientServiceClient.get(API_ENDPOINTS.CLIENTS.HEALTH)
    : await merchantServiceClient.get(API_ENDPOINTS.MERCHANTS.HEALTH);
  return response.data;
};

const TestBackendConnection: React.FC<Props> = ({ scope = 'all' }) => {
  const [selectedService, setSelectedService] = useState<'client' | 'merchant'>(
    scope === 'merchant' ? 'merchant' : 'client'
  );

  // Asegura que selectedService se actualiza si cambia la prop scope
  useEffect(() => {
    if (scope === 'client' || scope === 'merchant') {
      setSelectedService(scope);
    }
  }, [scope]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['healthCheck', selectedService],
    queryFn: () => fetchHealthStatus(selectedService),
    enabled: false,
    retry: false,
  });

  const handleTest = () => {
    refetch();
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🔍 Test de Conectividad Backend</h2>

      {/* Selector visible solo si se permite elegir */}
      {scope === 'all' && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setSelectedService('client')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedService === 'client'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Cliente Service
          </button>
          <button
            onClick={() => setSelectedService('merchant')}
            className={`px-4 py-2 rounded-md transition-colors ${
              selectedService === 'merchant'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Merchant Service
          </button>
        </div>
      )}

      <div className="bg-gray-50 p-3 rounded-md mb-4">
        <p className="text-sm text-gray-600">
          <strong>Endpoint:</strong>{' '}
          {selectedService === 'client'
            ? API_ENDPOINTS.CLIENTS.HEALTH
            : API_ENDPOINTS.MERCHANTS.HEALTH}
        </p>
      </div>

      <button
        onClick={handleTest}
        disabled={isLoading}
        className="btn-primary w-full mb-4"
      >
        {isLoading
          ? 'Probando conexión...'
          : `Probar ${selectedService === 'client' ? 'Cliente' : 'Merchant'} Service`}
      </button>

      {data && (
        <div className="bg-green-50 border border-green-200 p-4 rounded-md mb-2">
          <h3 className="text-green-800 font-medium mb-2">✅ Conexión exitosa</h3>
          <pre className="text-sm text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-md">
          <h3 className="text-red-800 font-medium mb-2">❌ Error de conexión</h3>
          <p className="text-red-700 text-sm">
            {error instanceof Error ? error.message : 'Error desconocido'}
          </p>
        </div>
      )}
    </div>
  );
};

export default TestBackendConnection;


