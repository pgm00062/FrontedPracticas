'use client';

import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { clientServiceClient } from '@/common/utils/httpClient';
import { API_ENDPOINTS } from '@/common/utils/apiConfig';
import type { Client } from '@/common/types/entities';

// Tipo para datos de creación de cliente
type CreateClientData = Omit<Client, 'PK' | 'SK' | 'id' | 'createdDate' | 'gIndex2Pk' | 'gsiPk' | 'gsiName'>;

// Función para generar JWT de prueba (simulado)
const generateTestJWT = (): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({
    sub: "test-user",
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hora
    role: "CLIENT_ADMIN"
  }));
  const signature = "test-signature-" + Math.random().toString(36).substr(2, 9);
  return `${header}.${payload}.${signature}`;
};

// Datos de cliente de prueba
const generateTestClient = (): CreateClientData => ({
  name: `Cliente Test ${Math.floor(Math.random() * 1000)}`,
  surname: `Apellido${Math.floor(Math.random() * 100)}`,
  email: `test${Math.floor(Math.random() * 1000)}@example.com`,
  phone: `+1234567${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
  cifNifNie: `12345678${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
  age: `${Math.floor(Math.random() * 50) + 20}`,
  status: 'ACTIVE',
});

// Función para crear cliente
const createClient = async (clientData: CreateClientData, token: string) => {
  // Configurar el token JWT en los headers
  const config = {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  };
  
  const response = await clientServiceClient.post(API_ENDPOINTS.CLIENTS.CREATE, clientData, config);
  return response.data;
};

const TestCreateClient: React.FC = () => {
  const [testJWT, setTestJWT] = useState<string>('');
  const [clientData, setClientData] = useState<CreateClientData>(generateTestClient());

  const mutation = useMutation({
    mutationFn: ({ clientData, token }: { clientData: CreateClientData, token: string }) => 
      createClient(clientData, token),
    onSuccess: (data) => {
      console.log('Cliente creado exitosamente:', data);
    },
    onError: (error) => {
      console.error('Error al crear cliente:', error);
    },
  });

  const handleGenerateJWT = () => {
    const newJWT = generateTestJWT();
    setTestJWT(newJWT);
  };

  const handleGenerateClient = () => {
    setClientData(generateTestClient());
  };

  const handleCreateClient = () => {
    if (!testJWT) {
      alert('Primero genera un JWT de prueba');
      return;
    }
    mutation.mutate({ clientData, token: testJWT });
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">🚀 Test Creación de Cliente</h2>
      
      <div className="space-y-6">
        {/* Sección JWT */}
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-2">
            1. JWT Token de Prueba
          </div>
          <div className="flex gap-2 mb-2">
            <button
              onClick={handleGenerateJWT}
              className="btn-secondary"
            >
              Generar JWT
            </button>
          </div>
          {testJWT && (
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-xs text-blue-700 font-mono break-all">
                {testJWT}
              </p>
            </div>
          )}
        </div>

        {/* Sección datos del cliente */}
        <div>
          <div className="block text-sm font-medium text-gray-700 mb-2">
            2. Datos del Cliente
          </div>
          <div className="flex gap-2 mb-3">
            <button
              onClick={handleGenerateClient}
              className="btn-secondary"
            >
              Generar Cliente Aleatorio
            </button>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md space-y-2">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <strong>Nombre:</strong> {clientData.name}
              </div>
              <div>
                <strong>Apellido:</strong> {clientData.surname}
              </div>
              <div>
                <strong>Email:</strong> {clientData.email}
              </div>
              <div>
                <strong>Teléfono:</strong> {clientData.phone}
              </div>
              <div>
                <strong>CIF/NIF/NIE:</strong> {clientData.cifNifNie}
              </div>
              <div>
                <strong>Edad:</strong> {clientData.age}
              </div>
              <div>
                <strong>Estado:</strong> {clientData.status}
              </div>
            </div>
          </div>
        </div>

        {/* Botón de test */}
        <button
          onClick={handleCreateClient}
          disabled={mutation.isPending || !testJWT}
          className="btn-primary w-full"
        >
          {mutation.isPending ? 'Creando cliente...' : 'Crear Cliente de Prueba'}
        </button>

        {/* Resultados */}
        {mutation.data && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-md">
            <h3 className="text-green-800 font-medium mb-2">✅ Cliente creado exitosamente</h3>
            <pre className="text-sm text-green-700 bg-green-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(mutation.data, null, 2)}
            </pre>
          </div>
        )}

        {mutation.error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-md">
            <h3 className="text-red-800 font-medium mb-2">❌ Error al crear cliente</h3>
            <p className="text-red-700 text-sm">
              {mutation.error instanceof Error ? mutation.error.message : 'Error desconocido'}
            </p>
          </div>
        )}

        {/* Información técnica */}
        <div className="bg-gray-50 p-3 rounded-md">
          <p className="text-xs text-gray-600">
            <strong>Endpoint:</strong> POST {API_ENDPOINTS.CLIENTS.CREATE} <br />
            <strong>Headers:</strong> Authorization: Bearer [token], Content-Type: application/json
          </p>
        </div>
      </div>
    </div>
  );
};

export default TestCreateClient;
