import React from 'react';
import type { ClientData } from '../interface';

interface ClientResultProps {
  client: ClientData | null;
}

const ClientResult: React.FC<ClientResultProps> = ({ client }) => {
  if (!client) return null;

  return (
    <div className="bg-green-50 border border-green-200 p-4 rounded-md">
      <h3 className="text-green-800 font-medium mb-3">✅ Cliente encontrado</h3>
      <div className="bg-white p-4 rounded border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <p className="text-sm text-gray-600">ID del Cliente</p>
            <p className="font-medium">{client.id}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Nombre Completo</p>
            <p className="font-medium">{client.name} {client.surname}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Email</p>
            <p className="font-medium">{client.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Teléfono</p>
            <p className="font-medium">{client.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Edad</p>
            <p className="font-medium">{client.age} años</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">DNI/CIF/NIE</p>
            <p className="font-medium">{client.cifNifNie}</p>
          </div>
        </div>
      </div>
      
      {/* Datos técnicos expandibles */}
      <details className="mt-3">
        <summary className="cursor-pointer text-sm text-green-700 hover:text-green-800">
          📄 Ver datos técnicos completos
        </summary>
        <pre className="text-xs text-green-700 bg-green-100 p-3 rounded overflow-x-auto mt-2">
          {JSON.stringify(client, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ClientResult;