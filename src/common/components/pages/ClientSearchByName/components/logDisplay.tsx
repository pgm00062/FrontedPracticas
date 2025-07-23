import React from 'react';
import type { LogEntry } from '../../../../utils/commonInterface';

interface LogDisplayProps {
  logs: LogEntry[];
}

// Función para obtener la clase CSS del log
const getLogClassName = (log: LogEntry): string => {
    let logClassName = 'text-xs font-mono p-2 rounded ';
    
    if (log.message.includes('✅') || log.message.includes('exitosamente')) {
        logClassName += 'text-green-700 bg-green-100';
    } else if (log.message.includes('❌') || log.message.includes('Error')) {
        logClassName += 'text-red-700 bg-red-100';
    } else if (log.message.includes('🔑') || log.message.includes('🎫')) {
        logClassName += 'text-blue-700 bg-blue-100';
    } else {
        logClassName += 'text-gray-600 bg-white';
    }
    
    return logClassName;
};

const LogDisplay: React.FC<LogDisplayProps> = ({ logs }) => {
  if (logs.length === 0) return null;

  return (
    <div className="bg-gray-50 border border-gray-200 p-4 rounded-md">
      <h3 className="text-gray-800 font-medium mb-2">📋 Logs de la operación</h3>
      <div className="space-y-1 max-h-48 overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className={getLogClassName(log)}>
            {log.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogDisplay;