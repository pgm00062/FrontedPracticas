import React from 'react';
import type { LogEntry, FeignMerchantData } from '../interface';

interface NotFoundMessageProps {
  logs: LogEntry[];
  lastResult: FeignMerchantData | null;
  isSearching: boolean;
  merchantId: string;
}

const NotFoundMessage: React.FC<NotFoundMessageProps> = ({
  logs,
  lastResult,
  isSearching,
  merchantId
}) => {
  // Solo mostrar si hay logs, no hay resultado, no está buscando
  if (logs.length === 0 || lastResult || isSearching) return null;

  return (
    <div className="bg-red-50 border border-red-200 p-4 rounded-md">
      <h3 className="text-red-800 font-medium mb-2">❌ Merchant no encontrado</h3>
      <p className="text-red-700">
        No se encontró ningún merchant con el ID: <strong>"{merchantId}"</strong>
      </p>
      <p className="text-sm text-red-600 mt-2">
        • Verifica que el ID sea correcto<br/>
        • Asegúrate de que el merchant existe en la base de datos<br/>
        • Revisa los logs de la operación más abajo para más detalles
      </p>
    </div>
  );
};

export default NotFoundMessage;