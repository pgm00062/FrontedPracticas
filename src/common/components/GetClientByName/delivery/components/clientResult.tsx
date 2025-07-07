import React from 'react';
import type { ClientData } from '../interface';

interface ClientResultsListProps {
  clients: ClientData[];
  selectedClient: ClientData | null;
  onSelectClient: (client: ClientData) => void;
}

const ClientResultsList: React.FC<ClientResultsListProps> = ({ 
  clients, 
  selectedClient, 
  onSelectClient 
}) => {
  // No mostrar nada si no hay resultados
  if (clients.length === 0) return null;

  return (
    <div className="space-y-2">
      {/* Header con contador */}
      <h3 className="text-sm font-medium text-gray-700">
        📋 {clients.length} cliente(s) encontrado(s):
      </h3>
      
      {/* Lista de resultados */}
      <div className="grid gap-2">
        {clients.map((client, index) => (
          <div 
            key={client.id || index}
            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedClient?.id === client.id 
                ? 'border-blue-500 bg-blue-50 shadow-sm' 
                : 'border-gray-200 hover:bg-gray-50 hover:border-gray-300'
            }`}
            onClick={() => onSelectClient(client)}
          >
            <div className="flex justify-between items-center">
              {/* Información principal */}
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  {client.name} {client.surname}
                </p>
                <p className="text-sm text-gray-600">{client.email}</p>
                {client.phone && (
                  <p className="text-xs text-gray-500 mt-1">📞 {client.phone}</p>
                )}
              </div>
              
              {/* Información secundaria */}
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">
                  ID: {client.id}
                </div>
                {selectedClient?.id === client.id && (
                  <div className="text-xs text-blue-600 font-medium">
                    ✓ Seleccionado
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Información adicional */}
      <div className="text-xs text-gray-500 mt-2">
        💡 Haz click en cualquier cliente para ver sus detalles completos
      </div>
    </div>
  );
};


export default ClientResultsList;