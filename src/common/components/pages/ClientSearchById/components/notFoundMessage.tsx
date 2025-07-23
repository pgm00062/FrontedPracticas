import React from 'react';
import type { LogEntry, ClientData } from '../../../../utils/commonInterface';

interface NotFoundMessageProps {
  logs: LogEntry[];
  lastResult: ClientData | null;
  isSearching: boolean;
  clientId: string;
}

const NotFoundMessage: React.FC<NotFoundMessageProps> = ({
  logs,
  lastResult,
  isSearching,
  clientId
}) => {
  // Solo mostrar si hay logs, no hay resultado, no está buscando
  if (logs.length === 0 || lastResult || isSearching) return null;

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-md">
      <h3 className="text-red-800 font-medium mb-2">❌ Cliente no encontrado</h3>
      <p className="text-red-700">
        No se encontró ningún cliente con el ID: <strong>"{clientId}"</strong>
      </p>
      <p className="text-sm text-red-600 mt-2">
        • Verifica que el ID sea correcto<br/>
        • Asegúrate de que el cliente existe en la base de datos<br/>
        • Revisa los logs de la operación más abajo para más detalles
      </p>
    </div>
  );
};

export default NotFoundMessage;